package vttp.batch4.csf.ecommerce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.repositories.PurchaseOrderRepository;

@Service
public class PurchaseOrderService {

  @Autowired
  private PurchaseOrderRepository poRepo;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  @Transactional  // add transactional here as order_details depends on orders entry's success
  public void createNewPurchaseOrder(Order order) {
    // Task 3
    System.out.println("\n>>> Order: " + order);

    poRepo.create(order);
    poRepo.batchInsertOrderDetails(order.getOrderId(), order.getCart().getLineItems());
  }
}
