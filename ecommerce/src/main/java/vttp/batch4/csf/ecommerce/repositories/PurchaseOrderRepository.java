package vttp.batch4.csf.ecommerce.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

	public static final String SQL_INSERT_ORDER = "INSERT INTO orders(order_id, order_date, name, address, priority, comments) VALUES (?, ?, ?, ?, ?, ?)";
  public static final String SQL_INSERT_ORDER_DETAILS = "INSERT INTO order_details(order_id, product_id, name, quantity, price) VALUES (?, ?, ?, ?, ?)";

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  public void create(Order order) {
    // Task 3
    Object[] data = new Object[] {
                      order.getOrderId(),
                      order.getDate(),
                      order.getName(),
                      order.getAddress(),
                      order.getPriority(),
                      order.getComments()
                    };
    
    template.update(SQL_INSERT_ORDER, data);
  }
  
  // order_details(order_id, product_id, name, quantity, price) VALUES (?, ?, ?, ?, ?)
  public void batchInsertOrderDetails(String orderId, List<LineItem> lineItems) {
    // Task 3
    List<Object[]> data = lineItems.stream()
                          .map(li -> new Object[] {
                              orderId,
                              li.getProductId(),
                              li.getName(),
                              li.getQuantity(),
                              li.getPrice()
                          }).toList();
    
    template.batchUpdate(SQL_INSERT_ORDER_DETAILS, data);
  }
}
