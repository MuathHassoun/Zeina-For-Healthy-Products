-- ============================================================
--  TYPES
-- ============================================================

CREATE TYPE order_status AS ENUM (
  'pending',
  'confirmed',
  'paid',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded'
);


-- ============================================================
--  TABLES
-- ============================================================

CREATE TABLE users (
  id         UUID       PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT,
  phone      TEXT,
  created_at TIMESTAMP  DEFAULT NOW()
);

CREATE TABLE products (
  id                UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT           NOT NULL,
  description       TEXT,
  price             NUMERIC(10,2)  NOT NULL,
  wholesale_price   NUMERIC(10,2)  NOT NULL,
  min_wholesale_qty INTEGER        DEFAULT 10,
  image_url         TEXT,
  protein           BOOLEAN        DEFAULT FALSE,
  sugar_free        BOOLEAN        DEFAULT FALSE,
  gluten_free       BOOLEAN        DEFAULT FALSE,
  created_at        TIMESTAMP      DEFAULT NOW()
);

CREATE TABLE orders (
  id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID          REFERENCES users(id) ON DELETE CASCADE,
  total_price NUMERIC(10,2) DEFAULT 0,
  status      order_status  DEFAULT 'pending',
  created_at  TIMESTAMP     DEFAULT NOW()
);

CREATE TABLE order_items (
  id         UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id   UUID          REFERENCES orders(id)   ON DELETE CASCADE,
  product_id UUID          REFERENCES products(id) ON DELETE CASCADE,
  quantity   INTEGER       NOT NULL,
  price      NUMERIC(10,2) NOT NULL,  -- actual price at time of purchase (retail or wholesale)
  created_at TIMESTAMP     DEFAULT NOW()
);

CREATE TABLE reviews (
  id         UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID      REFERENCES users(id)    ON DELETE CASCADE,
  product_id UUID      REFERENCES products(id) ON DELETE CASCADE,
  rating     INTEGER   CHECK (rating BETWEEN 1 AND 5),
  comment    TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);


-- ============================================================
--  FUNCTIONS
-- ============================================================

-- returns retail price normally, wholesale price if quantity meets the minimum threshold
CREATE OR REPLACE FUNCTION get_product_price(
  p_product_id UUID,
  p_quantity   INTEGER
)
RETURNS NUMERIC AS $$
DECLARE
  v_price           NUMERIC;
  v_wholesale_price NUMERIC;
  v_min_qty         INTEGER;
BEGIN
  SELECT price, wholesale_price, min_wholesale_qty
    INTO v_price, v_wholesale_price, v_min_qty
    FROM products
   WHERE id = p_product_id;

  IF p_quantity >= v_min_qty THEN
    RETURN v_wholesale_price;
  ELSE
    RETURN v_price;
  END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION set_order_item_price()
RETURNS TRIGGER AS $$
BEGIN
  NEW.price := get_product_price(NEW.product_id, NEW.quantity);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION update_order_total()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE orders
     SET total_price = (
           SELECT COALESCE(SUM(price * quantity), 0)
             FROM order_items
            WHERE order_id = NEW.order_id
         )
   WHERE id = NEW.order_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ============================================================
--  TRIGGERS
-- ============================================================

CREATE TRIGGER trg_set_order_item_price
  BEFORE INSERT ON order_items
  FOR EACH ROW
  EXECUTE FUNCTION set_order_item_price();

-- must run AFTER insert so the new row is already visible to the SUM
CREATE TRIGGER trg_update_order_total
  AFTER INSERT ON order_items
  FOR EACH ROW
  EXECUTE FUNCTION update_order_total();


-- ============================================================
--  ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE users       ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders      ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_own_orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- restricts order_items access to rows belonging to the current user's orders
CREATE POLICY "users_select_own_order_items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
       WHERE orders.id      = order_items.order_id
         AND orders.user_id = auth.uid()
    )
  );
