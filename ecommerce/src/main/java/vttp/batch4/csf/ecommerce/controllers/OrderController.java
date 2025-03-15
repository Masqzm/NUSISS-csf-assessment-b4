package vttp.batch4.csf.ecommerce.controllers;


import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.JsonValue;
import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
@RequestMapping("/api")
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // POST /api/order
  // Content-Type: application/json
  // Accept: application/json
  @PostMapping(path = "/order", 
              consumes = MediaType.APPLICATION_JSON_VALUE,
              produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public ResponseEntity<String> postOrder(@RequestBody String payload) {  
    // Note: Can use direct JSON -> model mapping if attributes are exactly same 
    // (ie. @RequestBody Order order)
    // Task 3
    System.out.println(">>> payload: " + payload);

    JsonReader reader = Json.createReader(new StringReader(payload));
    JsonObject json = reader.readObject();

    Order order = new Order();
    order.setName(json.getString("name"));
    order.setAddress(json.getString("address"));
    order.setPriority(json.getBoolean("priority"));
    order.setComments(json.getString("comments"));

    Cart cart = new Cart();

    JsonArray jLineItemsArr = json.getJsonObject("cart").getJsonArray("lineItems");
    for(int i = 0; i < jLineItemsArr.size(); i++) {
      JsonObject jLI = jLineItemsArr.getJsonObject(i);

      LineItem li = new LineItem();

      li.setName(jLI.getString("name"));
      li.setPrice((float) jLI.getJsonNumber("price").doubleValue());
      li.setProductId(jLI.getString("prodId"));   // the whole reason we're doing this...
      li.setQuantity(jLI.getInt("quantity"));

      cart.addLineItem(li);
    }

    order.setCart(cart);

    JsonObject response; 

    try {
      poSvc.createNewPurchaseOrder(order);
    } catch(Exception ex) {
      response = Json.createObjectBuilder()
              .add("message", ex.getMessage())
              .build();  

      return ResponseEntity.status(400).body(response.toString());
    }

    response = Json.createObjectBuilder()
              .add("orderId", order.getOrderId())
              .build();

    System.out.println("response: " + response.toString());

	  return ResponseEntity.ok().body(response.toString());
  }
}

/* Payload sample
payload: 
{
"name":"name",
"address":"addr",
"priority":false,
"comments":"c",
"cart":
	{
    "lineItems":
		[
      {"prodId":"67d51458737bb8ad0dadb7c9","quantity":1,"name":"Cheese Slices - Made From Cow Milk 663 g + Cheese Spread - Cream Cheese 100 g","price":525.9400024414062},
      {"prodId":"67d51458737bb8ad0dadb2c1","quantity":2,"name":"Butter - Pasteurized","price":502},
      {"prodId":"67d51458737bb8ad0dadb2c1","quantity":1,"name":"Butter - Pasteurized","price":502}
    ]
	}
}
 */