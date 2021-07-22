package com.location.LocationFetcher.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Embeddable
public class GpsData {

    @Column(name = "lat")
    @JsonProperty("latitude")
    private Double lat;

    @Column(name = "lng")
    @JsonProperty("longitude")
    private Double lng;

}
