module default {
# to delete billboard and categories when deleting store try change the schema. add links of those types in the store 
# and add `on source delete delete target` and maybe `on target delete allow` in the targets.

    type Store {
     required name: str;
     required userId: str;
     required createdAt: datetime {
                readonly := true;
                default := datetime_current() 
                };  
     required updatedAt: datetime {
        readonly := true;
        default := datetime_of_statement();
        # volatility := {'Stable'};
  };
    multi products: Product;
    multi orders: Order;
          totalSales:= count((select .orders filter .isPaid = true));
          inStock:= count((select .products filter .isArchived = true));
          totalRevenue:= sum(.orders.totalPrice)

  }

  type Billboard {
    required label: str;
    required imageUrl: str;

    required createdAt: datetime {
             readonly := true;
             default := datetime_current() 
            };  
            
    required updatedAt: datetime {
        readonly := true;
        default := datetime_of_statement();
  };

    required store: Store {
      on target delete delete source;
    };

  }

  type Category {
        required  name: str;
        required  createdAt: datetime {
            default := datetime_current();
        }

        required  updatedAt : datetime {
            default := datetime_current();
        }


        # multi  products: Product;
        required  billboard: Billboard;

        required store: Store {
        on target delete delete source;
      };
  }

  type Size {
        required name: str;
        required value: str;
        required  createdAt: datetime {
            default := datetime_current();
        }
        required  updatedAt: datetime {
            default := datetime_current();
        }
        required store: Store {
        on target delete delete source;
      };
  }

    type Color {
        required name: str;
        required value: str;
        required  createdAt: datetime {
            default := datetime_current();
        }
        required  updatedAt: datetime {
            default := datetime_current();
        }
        required store: Store {
        on target delete delete source;
      };
  }


    type Product {
        required name: str;
        required price: decimal;
        required images: array<str>;
        required isFeatured: bool {
            default := false;
        }
        required isArchived: bool {
            default := false;
        }
         required createdAt: datetime {
            default := datetime_current();
        }
        required updatedAt: datetime {
            default := datetime_current();
        }

        required store: Store {
          on target delete delete source;
        };
        required category: Category;
        required size: Size;
        required color: Color;
        # multi images: Image;
        # multi orderItems: OrderItem;
       
    }

    type Order {
    required customerName: str;    
    required customerEmail: str {
        constraint exclusive;
        constraint max_len_value(254);
        constraint regexp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    };    
    required multi products: Product;
    required isPaid: bool {
        default := false;
    };
    required phone: str;
    required address: str;
             productNames := array_join(array_agg(.products.name), ", ");
             totalPrice := sum(.products.price);

    required createdAt: datetime {
        default := datetime_current();
    }
    required updatedAt: datetime {
        default := datetime_current();
    }

    required store: Store {
        on target delete delete source;
    };

    }



#   type Image {
#     required url: str;

#     required createdAt: datetime {
#         default := datetime_current();
#     }
#     required updatedAt: datetime {
#         default := datetime_current();
#     }

#     required product: Product;
# }

}
