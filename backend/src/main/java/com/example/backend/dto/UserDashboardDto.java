package com.example.backend.dto;

import com.example.backend.entity.HardwareStore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDashboardDto {
    private UserDto user;
    private List<HardwareStore> stores;
    private List<ProductDto> products;
    private Integer totalStores;
    private Integer totalProducts;
}