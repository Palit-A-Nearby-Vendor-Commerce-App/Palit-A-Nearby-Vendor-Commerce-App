# Palit-A-Nearby-Vendor-Commerce-App
# App Development Plan

## Developers:
Badilla, Mark Kenneth
Briones, Joshua
Coyoca, Alestair Cyril
Selma, Kheisa

## Overview
Palit is a web app that connects nearby vendors and customers who want to buy or sell goods or services in a convenient and cash-based way. The app uses realtime geolocation to show the users' locations on a map and allows them to chat and transact with each other.

## Ideas
- **3 Types of Users**: Customers who will order from vendors. Vendors who will sell to customers and manage their own stores. Admins who have full access to the database and crud powers.
- **Accounts**: Users can sign up. In the sign up screen they enter their email, name, birthdate, and choose if they are a customer or a vendor. Admins cannot log in normally in the /signin page. They have a separate page /adminsignin to access the dashboard using their predefined email and password. Admin accounts are manually created in the databse during development and cannot be created through signup. All signups will create only vendors or customers, never admins.
- **Admin Dashboard**: It is the user interface custom built to reflect the database and allows admins to perform CRUD operations. There is a left sidebar showing the links to different tables and a dashboard link. default link is the dashboard link which shows stats on top and table heads below.
- **Map**: This is the screen that appears upon log in. Users can see their own location and the locations of other users (they can only see vendors' icons who are not admins if they are a customer, and only see customers' icons who are not admins if they are a vendor) within a certain distance limit (200 meters) on a map they also see a report icon to the lower left. Admins do not show up on the map. 
- **Custom Icons**: In customer's POV, the vendors show up as an icon depending on the services or the products they offer. We have created a fixed catalogue of categories that vendors can use to describe their stores such as fish, fruits, hats, etc. In vendor's pov the customer icons are either light blue with white stroke if they are not currently ordering and dark blue with white stroke if they are currently ordering.
- **Report**: In the map screen the both customers and vendors can see a report icon in the lower left which when pressed opens the report screen. Here they can input their message to the admins about bugs they faced, suggestions, or problems they had with other users. Admins will respond outside the app via email as the id of the user who reported is visible to the admin which can be used to see their email.
- **Store as floating window in the map**: The store page will appear as a floating window in the right side of the map page. In vendor's pov, vendors can view their store by clicking on the my store icon at the bottom of the queue floating window. In the store, they can click the edit store button to enter edit mode and edit their store name, description, category which will determine the icon in the map, and products or services. They can also specify the name, price, and image of each product or service they offer. New vendors upon clicking my store, will show their empty store which have default stores with null names, description, and category and no products. Stores with no products will not appear in the map to prevent confusion. 

In the customer's pov, if no store has been selected yet, this floating window will show Select a vendor to 
see their store... When a vendors who have set up their store are nearby, they show up as icons in the customer's map. When customer selects a store, they can view the vendors' store name, description, category, and products or services. They can also select the quantity they want, and see the total price below. They can also place an order by tapping the order button, which will create a transaction object sent to the vendor thru chat, listing the products and quantities they selected with a status of in queue. The order button becomes a cancel order button when clicked.
- **Chat**: Vendors and customers can chat with each other for inquiries, negotiations, or feedback. Transactions created by the customers are also sent as messages in chat, where the status can change from in queue to now serving to completed or to cancelled. Vendors can accept orders by tapping the accept button in transaction object in chat or they can ignore it completely. Customers can cancel their orders by tapping the cancel button in the store page. Once the order is completed, customers can rate the vendor by filling out a 5 star form in chat which appears attached below the transaction object.
- **Customer queue as floating window in the map**: In vendor's pov, if no customer has ordered, this will show Waiting for customers... When there are ordering customers, the ordering customers will show up as a list with a header of In Queue. They are also visible as dark blue dots on the map. The vendor may click a customer in queue to open the chat page with that customer then click the accept order button to change the customer's status as now serving. The customer they are currently serving will appear in a red div with white text on top of the in queue list with a header "Now Serving" on top of the div. They also show up in the map as a red pin. When the vendor marks the order as complete in chat, the customer's status will change to completed and theyll revert as a light blue icon in map, disappearing from the queue.
- **Cash on delivery**: Customers only pay after receiving their ordered goods or services, similar to how traditional transactions work.
- **Report**: Users can file a report for any bugs or issues they face with other users. Their reports are shown as the first table in the admin dashboard. 
- **About us Page**: this will show the development team
- **Contact us Page**: this will show a form to contact the developers behind the project
- **Services Page**: this will show a summary of what the app offers.

## Limitations
- **In-app payment**: We will not offer in-app payment due to the time constraint and security issues.
- **We are student newbie developers** who are still learning about the frameworks and APIs that we need to use and especially React for front end.


# Diagrams so far:

- Class diagram:
```
@startuml
class User {
    - int userId
    - String name
    - Date birthDate
    - byte[] image
    - int accountId
    - boolean isDeleted
    + int getUserId()
    + void setUserId(int userId)
    + String getName()
    + void setName(String name)
    + Date getBirthDate()
    + void setBirthDate(Date birthDate)
    + byte[] getImage()
    + void setImage(byte[] image)
    + int getAccountId()
    + void setAccountId(int accountId)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

class Account {
    - int accountId
    - String email
    - String password
    - boolean isVendor
    - boolean isAdmin
    - int locationId
    - int storeId
    - boolean isDeleted
    + int getAccountId()
    + void setAccountId(int accountId)
    + String getEmail()
    + void setEmail(String email)
    + String getPassword()
    + void setPassword(String password)
    + boolean getIsVendor()
    + void setIsVendor(boolean isVendor)
    + boolean getIsAdmin()
    + void setIsAdmin(boolean isAdmin)
    + int getLocationId()
    + void setLocationId(int locationId)
    + int getStoreId()
    + void setStoreId(int storeId)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

User "1" -- "1" Account : has

class Store {
    - int storeId
    - String storeName
    - String description
    - String category
    - int rating
    - boolean isDeleted
    + int getStoreId()
    + void setStoreId(int storeId)
    + String getStoreName()
    + void setStoreName(String storeName)
    + String getDescription()
    + void setDescription(String description)
    + String getCategory()
    + void setCategory(String category)
    + int getRating()
    + void setRating(int rating)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

Account "1" -- "1" Store : owns

class ProductService {
    - int productId
    - String name
    - double price
    - int storeId
    - byte[] image
    - boolean isDeleted
    + int getProductId()
    + void setProductId(int productId)
    + String getName()
    + void setName(String name)
    + double getPrice()
    + void setPrice(double price)
    + int getStoreId()
    + void setStoreId(int storeId)
    + byte[] getImage()
    + void setImage(byte[] image)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

Store "1" -- "*" ProductService : offers

class Location {
    - int locationId
    - double latitude
    - double longitude
    - boolean isDeleted
    - boolean isActive
    + int getLocationId()
    + void setLocationId(int locationId)
    + double getLatitude()
    + void setLatitude(double latitude)
    + double getLongitude()
    + void setLongitude(double longitude)
    + boolean getIsActive()
    + void setIsActive(boolean isActive)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

Account "1" -- "1" Location : has

class Conversation {
    - int conversationId
    - int customerAccountId
    - int vendorAccountId
    - boolean isDeleted
    + int getConversationId()
    + void setConversationId(int conversationId)
    + int getCustomerAccountId()
    + void setCustomerAccountId(int customerAccountId)
    + int getVendorAccountId()
    + void setVendorAccountId(int vendorAccountId)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

Account "*" -- "*" Conversation : participates in

class Chat {
    - int chatId
    - int senderId
    - int receiverId
    - String messageContent
    - Timestamp timestamp
    - int conversationId
    - boolean isDeleted
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
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

Account "*" -- "*" Chat : sends

Chat "*" -- "1" Conversation : belongs to

class Transaction {
    - int accountCustomerId
    - int accountVendorId
    - String status
    - int rating
    - boolean isDeleted
    + int getAccountCustomerId()
    + void setAccountCustomerId(int accountCustomerId)
    + int getAccountVendorId()
    + void setAccountVendorId(int accountVendorId)
    + String getStatus()
    + void setStatus(String status)
    + int getRating()
    + void setRating(int rating)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

Account "*" -- "*" Transaction : involves

class Report {
    - int reportId
    - int senderId
    - String messageContent
    - Timestamp timestamp
    - boolean isResolved
    - boolean isDeleted
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
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

Account "1" -- "*" Report : sends

@enduml

```
----------------------------------------------------












----------------------------------------------------

- ERD:
```
@startuml

entity User {
    * userId : INT
    --
    name : VARCHAR(255)
    birthDate : DATE
    image : BLOB
    accountId : INT
    isDeleted : BOOLEAN
}

entity Account {
    * accountId : INT
    --
    email : VARCHAR(255)
    password : VARCHAR(255)
    isVendor : BOOLEAN
    isAdmin : BOOLEAN
    locationId : INT
    storeId : INT
    isDeleted : BOOLEAN
}

User ||--|| Account

entity Store {
    * storeId : INT
    --
    storeName : VARCHAR(255)
    description : VARCHAR(255)
    category : VARCHAR(255)
    rating : INT
    isDeleted : BOOLEAN
}

Account ||--o| Store

entity ProductService {
    * productId : INT
    --
    name : VARCHAR(255)
    price : DOUBLE
    storeId : INT
    image : BLOB
    isDeleted : BOOLEAN
}

Store ||--o{ ProductService

entity Location {
    * locationId : INT
    --
    latitude : DOUBLE
    longitude : DOUBLE
    isActive : BOOLEAN
    isDeleted : BOOLEAN
}

Account ||--o| Location

entity Conversation {
    * conversationId : INT
    --
    customerAccountId : INT
    vendorAccountId : INT
    isDeleted : BOOLEAN
}

Account ||--o{ Conversation

entity Chat {
    * chatId : INT
    --
    senderId : INT
    receiverId : INT
    messageContent : VARCHAR(255)
    timestamp : TIMESTAMP
    conversationId : INT
    isDeleted : BOOLEAN
}

Account ||--o{ Chat
Chat ||--|| Conversation

entity Transaction {
    * accountCustomerId : INT
    * accountVendorId : INT
    --
    status : VARCHAR(255)
    rating : INT
    isDeleted : BOOLEAN
}

Account ||--o{ Transaction

entity Report {
    * reportId : INT
    --
    senderId : INT
    messageContent : VARCHAR(255)
    timestamp : TIMESTAMP
    isResolved : BOOLEAN
    isDeleted : BOOLEAN
}

Account ||--o{ Report

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
----------------------------------------------------