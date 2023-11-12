# Palit-A-Nearby-Vendor-Commerce-App
# App Development Plan

## Overview
Palit is a web app that connects nearby vendors and customers who want to buy or sell goods or services in a convenient and cash-based way. The app uses realtime geolocation to show the users' locations on a map and allows them to chat and transact with each other.

## Features
- **Account**: Users can sign up. in the sign up screen they enter their email, name, birthdate, and choose if they are a customer or a vendor. Admins have a separate page where they can log in and access the database to perform CRUD operations.
- **Map**: This is the screen that appears upon log in. Users can see their own location and the locations of other users within a certain distance limit on a map they also see a report icon and refresh icon. Vendors can see nearby customers while customers can see the nearby vendors' icons and tap on them to view their stores in addition to the report and refresh icons, they also see a my store icon. 
- **Store as bottom sheet in map**: Vendors upon log in have default stores with null names and details and no products. They can view their store by clicking on the my store icon in the map page. Here they can click the edit button to enter edit mode and edit their store name, description, category which will determine the icon in the map, and products or services. They can also specify the name, price, and image of each product or service they offer. Customers can view the vendors' store details and products or services, select the quantity they want, and see the total price. They can also place an order by tapping the order button, which will create a transaction object listing the products and quantities they selected with a status of in queue. The order button becomes a cancel order button when clicked.
- **Chat**: Users can chat with each other for inquiries, negotiations, or feedback. Transactions created by the customers are also sent as messages in chat, where the status can change from in queue to now serving to completed or to cancelled. Vendors can accept or reject orders by tapping the accept or reject button in transaction object in chat. Customers can cancel their orders by tapping the cancel button in the store page. Once the order is completed, customers can rate the vendor by filling out a 5 star form in chat attached below the transaction object.
- **Customer queue as bottom sheet in map**: Vendors can see a list of ordering customers who are in queue in a bottom sheet in a div titled "In Queue" . They are also visible as dark blue dots on the map. The vendor must click a customer in queue to open chat then click the accept order button to change the customer's status as now serving. The customer they are currently serving will appear on top of the list in a div titled "Now Serving" and in the map as a red pin. When the vendor marks the order as complete in chat, the customer's status will change to completed.
- **Cash on delivery**: Customers only pay after receiving their ordered goods or services, similar to how traditional transactions work.
- **Distance visibility limit**: To ensure that the transaction is feasible, the customer and vendor must be within a certain distance from each other, so they can only see nearby vendors (for customers) or customers (for vendors) on the map.
- **Report**: Users can file a report for any bugs or issues they face with other users. Their reports are shown as the first table in the admin dashboard. 

## Limitations
- **In-app payment**: We will not offer in-app payment due to the time constraint and security issues.
- **We are student newbie developers** who are still learning about the frameworks and APIs that we need to use and especially React for front end.

## Data Requirements
For admins:
- We will create accounts thru sql to keep security

For customers:
- name
- birth date
- email - NO CONFIRMATION NEEDED

For vendors:
- name
- birth date
- email - NO CONFIRMATION NEEDED
- store name
- store description
- store category
- products/services name
- products/services price
- products/services image

## Technical Requirements
- We will only create a web app.
- We will use React JS for the front end.
- We will use Springboot for the back end.
- We can use any API or framework that can help us with our development.

## User Interface/Experience (UI/UX) Design
We plan to make a mobile only site for the main app features and a separate responsive page for the admin dashboard and landing page

## Screens
- Dashboard (admin only)
- Admin login and signup
- User login and signup
- Map (vendor and customer views)
- Store (vendor and customer views)
- Chat (vendor and customer views)


## Development Timeline
- 4 weeks

## Budget Estimate
- Zero budget

## Diagrams Needed
- Class Diagram 
- Entity Relationship Diagram
- 1 System wide Use Case Diagram
- Multiple specific Use Case Diagrams - based on system wide use case
- Activity Diagrams - for each actor


# Diagrams so far:

- Class diagram:
```
@startuml
class User {
    - int userId
    - String name
    - Date birthDate
    - String email
    - String password
    - Image image
    + int getUserId()
    + void setUserId(int userId)
    + String getName()
    + void setName(String name)
    + Date getBirthDate()
    + void setBirthDate(Date birthDate)
    + String getEmail()
    + void setEmail(String email)
    + String getPassword()
    + void setPassword(String password)
    + Image getImage()
    + void setImage()
}

class Account {
    - int accountId
    - boolean isVendor
    - boolean isAdmin
    - int userId
    + boolean getIsVendor()
    + void setIsVendor(boolean isVendor)
    + boolean getIsAdmin()
    + void setIsAdmin()
    + int getUserId()
    + void setUserId(int userId)
    + int getAccountId()
    + void setAccountId(int accountId)
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
	+ void setStoreId(int storeId)
	+ String getStoreName()
	+ void setStoreName(String storeName)
	+ String getDescription()
	+ void setDescription(String description)
	+ String getCategory()
	+ void setCategory(String category)
	+ int getVendorAccountId()
	+ void setVendorAccountId(int vendorAccountId)
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
	+ void setProductId(int productId)
	+ String getName()
	+ void setName(String name)
	+ String getDescription()
	+ void setDescription(String description)
	+ double getPrice()
	+ void setPrice(double price)
	+ String getImagePath()
	+ void setImagePath(String imagePath)
	+ int getStoreId()
	+ void setStoreId(int storeId)
}

Store "1" -- "*" ProductService : offers

class Location {
	- int locationId
	- double latitude
	- double longitude
	- int accountId
	+ int getLocationId()
	+ void setLocationId(int locationId)
	+ double getLatitude()
	+ void setLatitude(double latitude)
	+ double getLongitude()
	+ void setLongitude(double longitude)
	+ int getAccountId()
	+ void setAccountId(int accountId)
}

Account "1" -- "1" Location : has

class Conversation {
   - int conversationId
   - int senderId
   - int receiverId
   + int getConversationId()
   + void setConversationId(int conversationId)
   + int getSenderId()
   + void setSenderId(int senderId)
   + int getReceiverId()
   + void setReceiverId(int receiverId)
}

Account "*" -- "*" Conversation : participates in

class Chat {
   - int chatId
   - int senderId
   - int receiverId
   - String messageContent
   - Timestamp timestamp
   - int conversationId
   + int getChatId()
   + void setChatId(int chatId)
   + int getSenderId()
   + void setSenderId(int senderId)
   + int getReceiverId()
   + void setReceiverId(int receiverId)
   + String getMessageContent()
   + void setMessageContent(String messageContent)
   + Timestamp getTimestamp()
   + void setTimestamp(Timestamp timestamp)
   + int getConversationId() 
   + void setConversationId(int conversationId)
}

Account "*" -- "*" Chat : sends

Chat "*" -- "1" Conversation : belongs to

class Transaction {
   -  int accountCustomerId
   -  int accountVendorId
   -  String status
   -  int rating 
   + int getAccountCustomerId() 
   + void setAccountCustomerId(int accountCustomerId)
   + int getAccountVendorId() 
   + void setAccountVendorId(int accountVendorId)
   + String getStatus() 
   + void setStatus(String status) 
   + int getRating() 
   + void setRating(int rating) 
}

Account "*" -- "*" Transaction : involves

class Report {
   - int reportId
   - int senderId
   - Timestamp timestamp
   - boolean isResolved
   + int getReportId()
   + void setReportId(int reportId)
   + int getSenderId()
   + void setSenderId(int senderId)
   + String getMessageContent()
   + void setMessageContent(String messageContent)
   + Timestamp getTimestamp()
   + void setTimestamp(Timestamp timestamp)
   + boolean getIsResolved()
   + void setIsResolved(boolean isResolved)
}

Account "1" -- "*" Report : sends

@enduml

```
----------------------------------------------------

- ERD:
```
@startuml
entity User {
    * userId : INT
    --
    name : VARCHAR(255)
    birthDate : DATE
    email : VARCHAR(255)
    password : VARCHAR(255)
}

entity Account {
    * accountId : INT
    --
    isAdmin : BOOLEAN
    isVendor : BOOLEAN
    -- Foreign key referencing User entity
    userId_FK : INT
}

User ||--|| Account
User.username ||..|| Account.userId_FK

entity Store {
    * storeId : INT
    --
    storeName : VARCHAR(255)
    description : VARCHAR(255)
    category : VARCHAR(255)
    -- Foreign key referencing Account entity
    vendorAccountId_FK : INT
    rating : INT
}

Account ||--o| Store
Account.accountId ||..|| Store.vendorAccountId_FK

entity ProductService {
    * productId : INT
    --
    name : VARCHAR(255)
    description : VARCHAR(255)
    price : DOUBLE
    -- Foreign key referencing Store entity
    storeId_FK : INT
    imagePath : VARCHAR(255)
}

Store ||--o{ ProductService
Store.storeId }|..|| ProductService.storeId_FK

entity Location {
    * locationId : INT
    --
    latitude : DOUBLE
    longitude : DOUBLE
    -- Foreign key referencing Account entity
    accountId_FK : INT
}

Account ||--o| Location
Account.accountId ||..|| Location.accountId_FK

entity Conversation {
    * conversationId : INT
    --
    -- Foreign key referencing Account entity
    senderId_FK : INT
    -- Foreign key referencing Account entity
    receiverId_FK : INT
}

Account }|--o{ Conversation
Account.accountId }|..|| Conversation.senderId_FK
Account.accountId }|..|| Conversation.receiverId_FK

entity Chat {
    * chatId : INT
    --
    -- Foreign key referencing Account entity
    senderId_FK : INT
    -- Foreign key referencing Account entity
    receiverId_FK : INT
    messageContent : VARCHAR(255)
    timestamp : TIMESTAMP
    conversationId : INT
}

Account }|--o{ Chat
Account.accountId }|..|| Chat.senderId_FK
Account.accountId }|..|| Chat.receiverId_FK
Chat }o--|| Conversation
Conversation.conversationId }|..|| Chat.conversationId

entity Transaction {
    * accountCustomerId : INT
    * accountVendorId : INT
    --
    status : VARCHAR(255)
    rating : INT
}

Account }|--o{ Transaction
Account.accountId }|..|| Transaction.accountCustomerId
Account.accountId }|..|| Transaction.accountVendorId

entity Report {
    * reportId : INT
    --
    -- Foreign key referencing Account entity
    senderId_FK : INT
    messageContent : VARCHAR(255)
    timestamp : TIMESTAMP
    isResolved : BOOLEAN
}

Account ||--o{ Report
Account.accountId }|..|| Report.senderId
@enduml

```
-----------------------------------------------------







-----------------------------------------------------
Here is the generic system wide use case diagram:

```
@startuml
left to right direction
skinparam packageStyle rectangle
actor Customer
actor Vendor
actor Admin
rectangle Palit {
  Customer -- (Sign up)
  Customer -- (Log in)
  Customer -- (View map)
  Customer -- (View store)
  Customer -- (Place order)
  Customer -- (Cancel order)
  Customer -- (Chat with vendor)
  Customer -- (Rate vendor)
  Customer -- (Report issue)
  Vendor -- (Sign up)
  Vendor -- (Log in)
  Vendor -- (View map)
  Vendor -- (View store)
  Vendor -- (Edit store)
  Vendor -- (Accept order)
  Vendor -- (Complete order)
  Vendor -- (Chat with customer)
  Vendor -- (Report issue)
  Admin -- (Log in)
  Admin -- (View dashboard)
  Admin -- (Manage database)
}
@enduml
```

Here are the specific use case diagrams for each use case in the generic system wide use case diagram:

- Sign up:

```
@startuml
left to right direction
actor Customer
actor Vendor
rectangle Palit {
  Customer -- (Sign up)
  Vendor -- (Sign up)
  (Sign up) ..> (Enter email) : include
  (Sign up) ..> (Enter name) : include
  (Sign up) ..> (Enter birth date) : include
  (Sign up) ..> (Choose role) : include
  (Sign up) ..> (Create password) : include
  (Sign up) ..> (Confirm password) : include
  (Sign up) ..> (Submit) : include
}
@enduml
```

- Log in:

```
@startuml
left to right direction
actor Customer
actor Vendor
actor Admin
rectangle Palit {
  Customer -- (Log in)
  Vendor -- (Log in)
  Admin -- (Log in)
  (Log in) ..> (Enter email) : include
  (Log in) ..> (Enter password) : include
  (Log in) ..> (Submit) : include
}
@enduml
```

- View map:

```
@startuml
left to right direction
actor Customer
actor Vendor
rectangle Palit {
  Customer -- (View map)
  Vendor -- (View map)
  (View map) ..> (See own location) : extend
  (View map) ..> (See nearby users) : extend
  (View map) ..> (Tap on user icon) : extend
  (View map) ..> (Refresh map) : extend
  (View map) ..> (Report issue) : extend
}
@enduml
```

- View store:

```
@startuml
left to right direction
actor Customer
actor Vendor
rectangle Palit {
  Customer -- (View store)
  Vendor -- (View store)
  (View store) ..> (See store details) : include
  (View store) ..> (See products/services) : include
  Customer ..> (View store) : extends
  Vendor ..> (Edit store) : extends
}
@enduml
```

- Place order:

```
@startuml
left to right direction
actor Customer
rectangle Palit {
  Customer -- (Place order)
  (Place order) ..> (Select quantity) : include
  (Place order) ..> (See total price) : include
  (Place order) ..> (Tap order button) : include
  (Place order) ..> (Send transaction in chat) : include
}
@enduml
```

- Cancel order:

```
@startuml
left to right direction
actor Customer
rectangle Palit {
  Customer -- (Cancel order)
  (Cancel order) ..> (Tap cancel order button) : include
  (Cancel order) ..> (Change transaction status in chat) : include
}
@enduml
```

- Chat:

```
@startuml
left to right direction
actor Customer
actor Vendor
rectangle Palit {
  Customer -- (Chat with vendor)
  Vendor -- (Chat with customer)
  (Chat with vendor) ..> (Send message) : include
  (Chat with vendor) ..> (Receive message) : include
  (Chat with vendor) ..> (See transaction status) : include
  (Chat with vendor) ..> (Rate vendor) : extend
  (Chat with customer) ..> (Send message) : include
  (Chat with customer) ..> (Receive message) : include
  (Chat with customer) ..> (See transaction status) : include
  (Chat with customer) ..> (Accept order) : extend
  (Chat with customer) ..> (Complete order) : include
}
@enduml
```

- Rate vendor:

```
@startuml
left to right direction
actor Customer
rectangle Palit {
  Customer -- (Rate vendor)
  (Rate vendor) ..> (Fill out 5 star form) : include
  (Rate vendor) ..> (Submit rating) : include
  (Rate vendor) ..> (Update vendor rating) : include
}
@enduml
```

- Report issue:

```
@startuml
left to right direction
actor Customer
actor Vendor
rectangle Palit {
  Customer -- (Report issue)
  Vendor -- (Report issue)
  (Report issue) ..> (Tap report icon) : include
  (Report issue) ..> (Enter message) : include
  (Report issue) ..> (Submit report) : include
  (Report issue) ..> (Send report to admin) : include
}
@enduml
```

- Edit store:

```
@startuml
left to right direction
actor Vendor
rectangle Palit {
  Vendor -- (Edit store)
  (Edit store) ..> (Tap edit button) : include
  (Edit store) ..> (Enter store name) : include
  (Edit store) ..> (Enter store description) : include
  (Edit store) ..> (Choose store category) : include
  (Edit store) ..> (Manage product/service) : include
  (Manage product/service) ..> (Enter product/service name) : include
  (Manage product/service) ..> (Enter product/service price) : include
  (Manage product/service) ..> (Upload product/service image) : include
  (Edit store) ..> (Save changes) : include
}
@enduml
```

- Accept order:

```
@startuml
left to right direction
actor Vendor
rectangle Palit {
  Vendor -- (Accept order)
  (Accept order) ..> (Tap accept button) : include
  (Accept order) ..> (Change transaction status in chat) : include
  (Accept order) ..> (Update customer queue) : include
}
@enduml
```

- Complete order:

```
@startuml
left to right direction
actor Vendor
rectangle Palit {
  Vendor -- (Complete order)
  (Complete order) ..> (Tap complete button) : include
  (Complete order) ..> (Change transaction status in chat) : include
  (Complete order) ..> (Update customer queue) : include
}
@enduml
```

- Log in (admin):

```
@startuml
left to right direction
actor Admin
rectangle Palit {
  Admin -- (Log in)
  (Log in) ..> (Enter email) : include
  (Log in) ..> (Enter password) : include
  (Log in) ..> (Submit) : include
}
@enduml
```

- View dashboard (admin):

```
@startuml
left to right direction
actor Admin
rectangle Palit {
  Admin -- (View dashboard)
  (View dashboard) ..> (See reports) : include
  (View dashboard) ..> (See users) : include
  (View dashboard) ..> (See stores) : include
  (View dashboard) ..> (See products/services) : include
  (View dashboard) ..> (See transactions) : include
}
@enduml
```

- Manage database (admin):

```
@startuml
left to right direction
actor Admin
rectangle Palit {
  Admin -- (Manage database)
  (Manage database) ..> (Create record) : extend
  (Manage database) ..> (Read record) : extend
  (Manage database) ..> (Update record) : extend
  (Manage database) ..> (Delete record) : extend
}
@enduml
```