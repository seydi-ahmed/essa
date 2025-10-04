package com.example.backend.controller;

import com.example.backend.dto.ProductDto;
import com.example.backend.entity.Product;
import com.example.backend.service.ProductService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    private final ProductService productService;
    private final UserService userService;

    @PostMapping("/store/{storeId}")
    public ResponseEntity<ProductDto> createProduct(@PathVariable Long storeId,
                                                  @RequestBody Product product,
                                                  @AuthenticationPrincipal UserDetails userDetails) {
        Long ownerId = getUserIdFromUserDetails(userDetails);
        ProductDto createdProduct = productService.createProduct(product, storeId, ownerId);
        return ResponseEntity.ok(createdProduct);
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<ProductDto>> getProductsByStore(@PathVariable Long storeId) {
        return ResponseEntity.ok(productService.getProductsByStore(storeId));
    }

    @GetMapping("/my-products")
    public ResponseEntity<List<ProductDto>> getMyProducts(@AuthenticationPrincipal UserDetails userDetails) {
        Long ownerId = getUserIdFromUserDetails(userDetails);
        return ResponseEntity.ok(productService.getProductsByOwner(ownerId));
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/search/name/{name}")
    public ResponseEntity<List<ProductDto>> searchProductsByName(@PathVariable String name) {
        return ResponseEntity.ok(productService.searchProductsByName(name));
    }

    @GetMapping("/search/category/{category}")
    public ResponseEntity<List<ProductDto>> searchProductsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.searchProductsByCategory(category));
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<ProductDto>> getProductsByCity(@PathVariable String city) {
        return ResponseEntity.ok(productService.getProductsByCity(city));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id,
                                                  @RequestBody Product product,
                                                  @AuthenticationPrincipal UserDetails userDetails) {
        Long ownerId = getUserIdFromUserDetails(userDetails);
        ProductDto updatedProduct = productService.updateProduct(id, product, ownerId);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id,
                                            @AuthenticationPrincipal UserDetails userDetails) {
        Long ownerId = getUserIdFromUserDetails(userDetails);
        productService.deleteProduct(id, ownerId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDto>> searchProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String city) {
        
        if (name != null && !name.isEmpty()) {
            return ResponseEntity.ok(productService.searchProductsByName(name));
        } else if (category != null && !category.isEmpty()) {
            return ResponseEntity.ok(productService.searchProductsByCategory(category));
        } else if (city != null && !city.isEmpty()) {
            return ResponseEntity.ok(productService.getProductsByCity(city));
        } else {
            return ResponseEntity.ok(productService.getAllProducts());
        }
    }

    private Long getUserIdFromUserDetails(UserDetails userDetails) {
        if (userDetails == null) {
            throw new RuntimeException("User not authenticated");
        }
        
        String email = userDetails.getUsername();
        return userService.getUserByEmail(email).getId();
    }
}