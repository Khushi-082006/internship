const categories = [
    {
        id: "C1",
        categoryName: "Platters",
        superCategory: {
            superCategoryName: "South Indian",
            id: "SC1"
        }
    },
    {
        id: "C2",
        categoryName: "Tandoor",
        superCategory: {
            superCategoryName: "North Indian",
            id: "SC2"
        }
    }, 
    {
        id: "C3",
        categoryName: "Dosai",
        superCategory: {
            superCategoryName: "South Indian",
            id: "SC3"
        }
    },
    {
        id: "C4",
        categoryName: "Vegetables",
        superCategory: {
            superCategoryName: "North Indian",
            id: "SC4"
        }
    }
];

const menu = [
    {
        id: "item1",
        itemName: "Butter Roti",
        rate: 20,
        taxes: [{
                name: "Service Charge",
                rate: 10,
                isInPercent: true,
            },
            {
                name: "GST",
                rate: 18,
                isInPercent: true,
            }],
        category: {
        categoryId: "C2"
        }
    },
    {
        id: "item2",
        itemName: "Paneer Butter Masala",
        rate: 120,
        taxes: [{
                name: "Service Charge",
                rate: 10,
                isInPercent: true,
            }, 
            {
                name: "GST",
                rate: 18,
                isInPercent: true,
            }, 
            {
                name: "Service Tax",
                rate: 10,
                isInPercent: true,
            }],
        category: {
        categoryId: "C4"
        }
    }, 
    {
        id: "item3",
        itemName: "Masala Dosai",
        rate: 50,
        taxes: [{
                name: "GST",
                rate: 18,
                isInPercent: true,
            },
            {
                name: "Service Tax",
                rate: 10,
                isInPercent: true,
            }],
        category: {
        categoryId: "C3"
        }
    }, 
    {
        id: "item4",
        itemName: "Dosai Platter",
        rate: 150,
        taxes: [{
                name: "Service Tax",
                rate: 10,
                isInPercent: true,
            }],
        category: {
        categoryId: "C1"
        }
    }
];

const bill = {
    id: "B1",
    billNumber: 1,
    openTime: "06 Nov 2020 14:19",
    customerName: "CodeQuotient",
    billItems: [{
        id: "item2",
        quantity: 3,
        discount: {
            rate: 10,
            isInPercent: false,
        }
    }, 
    {
        id: "item1",
        quantity: 9,
        discount: {
            rate: 10,
            isInPercent: true,
        }
    },
    {
        id: "item4",
        quantity: 2,
        discount: {
            rate: 15,
            isInPercent: true,
        }
    }]
};

function calculateBill(bill) {
    let totalBillAmount = 0;
    let billItems = [];
    
    for(const items of bill.billItems){
        const findItem=menu.find((m)=>
            m.id === items.id
        );

        let Rate = findItem.rate;
        if(items.discount){
            if(items.discount.isInPercent){
                discount = ((items.discount.rate)/100) * Rate;
                Rate -= discount;
            }
            else{
                Rate -= items.discount.rate;
            }
        }

        let taxes = 0;
        if(findItem.taxes && findItem.taxes.length>0){
            for(const t of findItem.taxes){
                let taxRate=t.rate;
                if(taxRate){
                    if(t.isInPercent){
                        taxes += (taxRate/100) * Rate ; 
                    }
                    else{
                        taxes += taxRate ; 
                    }
                }
            }
        }

        Rate += taxes;
        totalBillAmount += Rate * items.quantity;

        billItems.push(
            `${findItem.itemName} @ ${findItem.rate} * ${items.quantity} = ${totalBillAmount}`
        );
    }

    totalBillAmount = totalBillAmount.toFixed(2);

    return [totalBillAmount, billItems];
}

function display(){
    let array = calculateBill(bill);
    console.log(array[0]);
    array[1].forEach(element => {
        console.log(element)
    });
}

display();