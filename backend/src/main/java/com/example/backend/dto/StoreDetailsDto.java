package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreDetailsDto {
    private Long id;
    private String name;
    private String address;
    private String city;
    private String phone;
    private String description;
    private UserDto owner;
    private List<ProductDto> products;
}