package com.tour.model;

import jakarta.persistence.*;

@Entity
@Table(name="Tours")
public class Tour {
    @SequenceGenerator(name="yourSequenceGenerator", allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "yourSequenceGenerator")
    private Integer id;
    @Column(name="image")
    private String image;
    @Column(name="title")
    private String title;
    @Column(name="category")
    private String category;
    @Lob
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    @Column(name="price")
    private Integer price;
    public Integer getId(){
        return id;
    }
    public void setId(Integer id){
        this.id = id;
    }
    public String getImage(){
        return image;
    }
    public void setImage(String image){
        this.image = image;
    }
    public String getTitle(){
        return title;
    }
    public void setTitle(String title){
        this.title = title;
    }
    public String getCategory(){
        return category;
    }
    public void setCategory(String category){
        this.category = category;
    }
    public String getDescription(){
        return description;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public Integer getPrice(){
        return price;
    }
    public void setPrice(Integer price){
        this.price = price;
    }
}
