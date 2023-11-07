# Palit-A-Nearby-Vendor-Commerce-App
Palit-A-Nearby-Vendor-Commerce-App

# App Development Plan

## Summary:

The app is called Palit, which means to buy in Bisaya. It is a commerce app that connects nearby vendors and customers who want to buy or sell products or services on the spot. The app uses real time geolocation to show the locations of both parties on a map, and allows them to chat, create transactions, and rate transactions. The app aims to provide convenience, flexibility, and security for both vendors and customers.
We have identified a gap in the market for an app that caters to the needs of moving vendors, such as taho vendors, vendors who sell along the sidewalk, or vendors that use push carts to move around with their products. These vendors are often overlooked by other platforms that focus on fixed establishments or delivery services. According to a study by the University of San Carlos, there are around 3,000 moving vendors in Cebu City, who contribute to the informal economy and the livelihood of many families. However, they also face many challenges, such as lack of access to customers, unfair competition, harassment, and discrimination.
Our app seeks to address these challenges by providing the following benefits:
It helps improve the vendors’ sales, reach, and exposure by allowing them to be visible to potential customers within a certain distance limit, and by sending notifications to customers when there are nearby vendors offering their desired products or services.
It helps set a fixed price for the products or services to prevent discrimination towards foreigners by making the products overpriced. Customers can also see the total price of their order before confirming it, and pay only after receiving their order.
It helps protect the vendors from being deprived of their source of livelihood by giving them a platform to register their business, manage their store, and receive feedback from customers. It also helps them comply with the regulations of the local government, such as the ordinance that aims to regulate street vendors and market vendors without stalls.
Our app does not aim to replace GrabFood, Foodpanda, Shopee, or discovering stores via Google Maps, but to provide an alternative that uplifts moving vendors without fixed stalls or stores. We believe that our app can create a win-win situation for both vendors and customers, as well as contribute to the development and modernization of Cebu City.


## Name: Palit: A Commerce App for Nearby Vendors

## Functionalities
- **Realtime geolocation**: the app enables vendors and customers to see each other's locations on a map within a certain distance limit. Customers can also view the vendors' icons that indicate their goods or services.
- **Account**: users can create either a vendor or a customer account.
- **Vendor store management**: vendors can edit their store details and their products or services.
- **Customer store browsing**: customers can tap on a vendor icon on the map and see their store. They can select the products they want and see the total price at the bottom. They can also send their selections to the vendor by tapping the I'm interested button, which will create a transaction object with a status of either in queue or now serving, depending on whether there are other customers ahead of them or not. 
- **Chat**: vendors and customers can chat with each other for inquiries, negotiations, or feedback. 
- **Status area in the bottom of chat**: This shows the current status of the transaction, which could be in queue, now serving, or completed. For vendors, there is also a finish transaction button that they can press when the transaction is done, which will prompt the customer to rate the vendor. For customers, there is also a rate vendor button that they can use after the transaction is completed.
- **Vendor's pov - customer queue**: vendors can see the customers who are interested in buying from them as yellow dots on the map. The customer they are currently serving will appear as a red dot. Customers will receive notifications about their status changes, such as when they are being served or when the transaction is completed. The first customer who taps the I'm interested button will have a status of now serving, while the others will have a status of in queue. When the vendor presses the finish transaction button, the customer's status will change to completed and the next customer in line will have a status of now serving.
- **Cash on delivery**: customers only pay after receiving their ordered goods or services, similar to how traditional transactions work.
- **Notifications**: vendors and customers receive notifications when there are potential buyers or sellers near them. The notifications for customers include a brief summary of what the nearby vendor is offering.
- **Distance visibility limit**: to ensure that the transaction is feasible, the customer and vendor must be within a certain distance from each other, so they can only see nearby vendors (for customers) or customers (for vendors) on the map.

## Limitations
- **In-app payment**: we will not offer in-app payment due to the time constraint and security issues.
- **We are student newbie developers** who are still learning about the frameworks and APIs that we need to use.

## User Roles
- **Customers**: they buy products or services from the vendors. They may actively look for vendors on the map or wait for notifications from nearby vendors.
- **Vendors**: they sell products or services that they have with them or can provide on the spot. They may move around to find customers or wait for notifications from nearby buyers.

## Data Requirements
For customers:
- name
- birth date
- email (to be verified on sign up)

For vendors:
- name
- birth date
- email (to be verified on sign up)
- store name
- products/services and details

## Business Rules
1. Vendors need a verified email account to start selling
1. Customers need a verified email account to start buying

## Technical Requirements
- We will only create a web app.
- We will use React JS for the front end.
- We will use Springboot for the back end.
- We can use any API or framework that can help us with our development.

## User Interface/Experience (UI/UX) Design
We plan to make a responsive website that is mobile first.

We have planned to have these screens:
- Login or signup screen where the user can input their details only once to prevent fraud in the platform
- Chat screen which serves as the communication and notification center. It appears after the vendor taps on their current customer in queue or after the customer taps on I'm interested in the vendor's store. Notifications are posted as messages.

Vendor:
  - Map screen with customer locations for vendors, where customers turn red when being served and yellow when in queue
  - Customer queue at the bottom of the map for vendors
  - Store edit screen for vendors

Customer:
  - Map screen with vendor locations and icons for customers, where icons show what goods or services are offered
  - Store preview at the bottom of the map for customers when they tap on a vendor icon on the map
  - Store browse screen for customers


## Development Timeline
- 4 weeks

## Budget Estimate
- Zero budget

## Diagrams Needed
- 1 Use Case Diagram - System wide
- Multiple Use Case Diagrams - Specifics based on system wide use case
- Class Diagram - exactly 8 entities
- Activity Diagrams 
- Entity Relationship Diagram

## NOTICE
in a separate route, the admin page can be accessed where admins can sign up and login. 

# Diagrams so far:
- Use Case Diagram (System-wide)
```
@startuml
left to right direction
actor Customer
actor Vendor

rectangle "Palit: Nearby Vendor Commerce App" {
  Customer -- (View Realtime Geolocation)
  Vendor -- (View Realtime Geolocation)
  
  Customer -- (Set Up Account)
  Vendor -- (Set Up Account)
  
  Vendor -- (Manage Store)
  
  Customer -- (Browse Stores)
  
  Customer -- (Chat)
  Vendor -- (Chat)

  Customer -- (Create Transaction)
  
  Customer -- (View Transaction Status)
  Vendor -- (View Transaction Status)
  
  Vendor -- (Update Transaction Status)
  Customer -- (Update Transaction Status)
}
@enduml
```

- Class diagram:
```
@startuml
class User {
    - String name
    - Date birthDate
    - String email
    - String username
    - String password
    + String getName()
    + Date getBirthDate()
    + String getEmail()
    + String getUsername()
    + String getPassword()
    + void setPassword(String password)
}

class Account {
    - int accountId
    - boolean isVendor
    - int userId
    + boolean getIsVendor()
    + int getUserId()
    + int getAccountId()
}

User "1" -- "1" Account : has

class Store {
    - int storeId
    - String storeName
    - String description
    - String category
    - int vendorAccountId
	- int rating
	+ int getStoreId()
	+ String getStoreName()
	+ String getDescription()
	+ void setDescription(String description)
	+ void setStoreName(String storeName)
	+ String getCategory()
	+ int getVendorAccountId()
	+ int getRating()
	+ void setRating(int rating)
}

Account "1" -- "1" Store : owns

class ProductService {
	- int productId
	- String name
	- String description
	- double price
	- int storeId
	- String imagePath
	+ int getProductId()
	+ String getName()
	+ void setName(String name)
	+ String getDescription()
	+ void setDescription(String description)
	+ double getPrice()
	+ void setPrice(double price)
	+ String getImagePath()
	+ int getStoreId()
	+ void setImagePath(String imagePath)
}

Store "1" -- "*" ProductService : offers

class Location {
	- int locationId
	- double latitude
	- double longitude
	- int accountId
	+ int getLocationId()
	+ double getLatitude()
	+ void setLatitude(double latitude)
	+ double getLongitude()
	+ void setLongitude(double longitude)
}

Account "1" -- "1" Location : has

class Conversation {
   - int conversationId
   - int senderId
   - int receiverId
   + int getConversationId()
   + int getSenderId()
   + int getReceiverId()
}

Account "1" -- "*" Conversation : participates in

class Chat {
   - int chatId
   - int senderId
   - int receiverId
   - String messageContent
   - Timestamp timestamp
   - int conversationId
   + int getChatId()
   + Account getSender()
   + Account getReceiver()
   + String getMessageContent()
   + Timestamp getTimestamp()
   + int getConversationId() 
}

Account "1" -- "*" Chat : sends

Chat "1" -- "1" Conversation : belongs to

class Transaction {
   -  int accountCustomerId
   -  int accountVendorId
   -  String status
   -  int rating 
   + int getAccountCustomerId() 
   + int getAccountVendorId() 
   + String getStatus() 
   + void setStatus(String status) 
   + int getRating() 
   + void setRating(int rating) 
}

Account "1" -- "*" Transaction : involves

@enduml
```
-----------------------------------------------------
- Specific use cases:

- Use Case: Set Up Account
```
@startuml
left to right direction
actor Customer
actor Vendor

rectangle "Palit: Nearby Vendor Commerce App" {
  Customer -- (Set Up Account)
  Vendor -- (Set Up Account)
  
  (Set Up Account) <|-- (Enter Details)
  
  (Enter Details) ..> (Choose Role) : include
  
}
@enduml

```

- Use Case: View Realtime Geolocation
```
@startuml
left to right direction
actor Customer
actor Vendor

rectangle "Palit: Nearby Vendor Commerce App" {
  Customer -- (View Realtime Geolocation)
  Vendor -- (View Realtime Geolocation)
  
  (View Realtime Geolocation) <|-- (View Nearby Customers)
  (View Realtime Geolocation) <|-- (View Nearby Vendors)
  
  (View Nearby Vendors) ..> (Select Vendor) : extend
  
  (Select Vendor) ..> (See Store Preview) : include

  (View Nearby Customers) ..> (See Queue) : include

  (See Queue) ..> (Chat with Customer) : extend
}
@enduml
```

- Use Case: Manage Store
```
@startuml
left to right direction
actor Vendor

rectangle "Palit: Nearby Vendor Commerce App" {
  Vendor -- (Manage Store)
  
  (Manage Store) <|-- (Edit Store Details)
  (Manage Store) <|-- (Edit Products/Services)
  
  (Edit Store Details) ..> (Save Changes or Discard Changes) : include
  (Edit Products/Services) ..> (Save Changes or Discard Changes) : include
  
}
@enduml
```
- Use Case: Browse Stores
```
@startuml
left to right direction
actor Customer

rectangle "Palit: Nearby Vendor Commerce App" {
  Customer -- (Browse Stores)
  
  (Browse Stores) <|-- (See Store Details)

  (See Store Details) ..> (See Products/Services) : include
  
  (See Products/Services) ..> (Create Transaction) : extend
}
@enduml
```

- Use Case: Chat with Vendors/Customers
```
@startuml
left to right direction
actor Customer
actor Vendor

rectangle "Palit: Nearby Vendor Commerce App" {
  Customer -- (Chat with Vendors)
  Vendor -- (Chat with Customers)
  
  (Chat with Vendors) <|-- (Select Vendor)
  (Chat with Customers) <|-- (Select Customer)
  
  (Select Vendor) ..> (Send Message) : extend
  (Select Customer) ..> (Send Message) : extend
  
  (Select Vendor) ..> (Receive Message) : extend
  (Select Customer) ..> (Receive Message) : extend
}
@enduml
```

- Use Case: View Transaction Status
```
@startuml
left to right direction
actor Customer
actor Vendor

rectangle "Palit: Nearby Vendor Commerce App" {
  Customer -- (View Transaction Status)
  Vendor -- (View Transaction Status)
  
  (View Transaction Status) <|-- (See Status Area)
  
  (See Status Area) ..> (Update Transaction Status) : extend
  
}
@enduml
```

- Use Case: Create Transaction
```
@startuml
left to right direction
actor Customer

rectangle "Palit: Nearby Vendor Commerce App" {
  Customer -- (Create Transaction)
  
  (Create Transaction) <|-- (Select Products/Services)
  
  (Select Products/Services) ..> (See Total Price) : include
  (See Total Price) ..> (Confirm Order) : extend
  (Confirm Order) ..> (Update Transaction Status) : include
  (Confirm Order) ..> (Update Customer Queue) : include
  
}
@enduml
```

- Use Case: Update Transaction Status
```
  @startuml
  right to left direction
  actor Customer
  actor Vendor

  rectangle "Palit: Nearby Vendor Commerce App" {
    Customer -- (Rate Vendor)
    Customer -- (Notify Customer)
    Vendor -- (Update Transaction Status)
    
    (Update Transaction Status) <|-- (Change Status to In Queue)
    (Update Transaction Status) <|-- (Change Status to Now Serving)
    (Update Transaction Status) <|-- (Change Status to Completed)
    
    (Change Status to In Queue) ..> (Notify Customer) : include
    (Change Status to Now Serving) ..> (Notify Customer) : include
    (Change Status to Completed) ..> (Notify Customer) : include
    
    (Change Status to Completed) ..> (Rate Vendor) : extend
    
  }
  @enduml
```

- Use Case: Receive Notifications
```
@startuml
left to right direction
actor Customer
actor Vendor

rectangle "Palit: Nearby Vendor Commerce App" {
  Customer -- (Receive Notifications)
  Vendor -- (Receive Notifications)
  
  (Receive Notifications) ..> (Open Notification) : extend
  
  (Open Notification) ..> (Open Main Page) : include
}
@enduml
```

- Activity Diagrams
1. Vendor's POV:
```
@startuml
start

:Log in or sign up;
if (Is customer?) then (yes)
  :Verify email;
else (no)
  stop
endif

:View realtime geolocation;
fork
  :View nearby vendors;
  :Select vendor;
  :See store preview;
  :Create transaction;
  :Chat with vendor;
  :View transaction status;
  :Rate vendor;
fork again
  :Receive notifications;
end fork

stop
@enduml

```

Customer's POV:
```
@startuml
start
:Log in or sign up;
if (Is email verified?) then (yes)
  :View realtime geolocation;
else (no)
  :Verify email;
endif
:View nearby vendors;
:Select vendor;
:See store preview;
:Chat with vendor;
:Select products/services;
:Confirm order;
:Send order to vendor;
:View transaction status;
if (Status is now serving?) then (yes)
  :Receive products/services;
else (no)
  stop
endif
:Change status to completed;
:Rate vendor;
stop
@enduml
```

- ERD:
```
@startuml
entity User {
    * userId : int
    --
    name : String
    birthDate : Date
    email : String
    username : String
    password : String
}

entity Account {
    * accountId : int
    --
    isVendor : boolean
    userId : int
}

entity Store {
    * storeId : int
    --
    storeName : String
    description : String
    category : String
    vendorAccountId : int
	rating : int
}

entity ProductService {
    * productId : int
    --
    name : String
    description : String
    price : double
    storeId : int
    imagePath : String
}

entity Location {
    * locationId : int
    --
    latitude : double
    longitude : double
    accountId : int
}

entity Conversation {
    * conversationId : int
    --
    senderId : int
    receiverId : int
}

entity Chat {
    * chatId : int
    --
    senderId : int
    receiverId : int
    messageContent : String
    timestamp : Timestamp
    conversationId : int
}

entity Transaction {
    * transactionId : int
    --
    accountCustomerId : int
    accountVendorId : int
    status : String
    rating : int
}

User ||--|| Account
Account ||--o| Store
Store ||--o{ ProductService
Account ||--|| Location
Account }o--|{ Conversation
Account }o--|{ Chat
Chat }o--|| Conversation
Account }o--|{ Transaction

@enduml

```