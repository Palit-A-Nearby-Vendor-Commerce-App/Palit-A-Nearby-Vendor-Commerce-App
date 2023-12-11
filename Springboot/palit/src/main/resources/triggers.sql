
-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS account_delete_trigger;
DROP TRIGGER IF EXISTS chat_delete_trigger;
DROP TRIGGER IF EXISTS location_delete_trigger;
DROP TRIGGER IF EXISTS product_service_delete_trigger;
DROP TRIGGER IF EXISTS store_delete_trigger;
DROP TRIGGER IF EXISTS transaction_delete_trigger;
DROP TRIGGER IF EXISTS user_delete_trigger;
DROP TRIGGER IF EXISTS report_delete_trigger;


DELIMITER //

-- Create a trigger for AccountEntity that sets related entities to deleted
CREATE TRIGGER account_delete_trigger
BEFORE DELETE ON tblAccount
FOR EACH ROW
BEGIN
  UPDATE tblUser SET isDeleted = true WHERE accountId = OLD.accountId;
  UPDATE tblLocation SET isDeleted = true WHERE locationId = OLD.locationId;
  UPDATE tblStore SET isDeleted = true WHERE storeId = OLD.storeId;
  UPDATE tblChat SET isDeleted = true WHERE senderId = OLD.accountId;
  UPDATE tblConversation SET isDeleted = true WHERE vendorAccountId = OLD.accountId OR customerAccountId = OLD.accountId;
  UPDATE tblTransaction SET isDeleted = true WHERE accountCustomerId = OLD.accountId OR accountVendorId = OLD.accountId;
  UPDATE tblReport SET isDeleted = true WHERE senderId = OLD.accountId;
END;

-- Create a trigger for ChatEntity
CREATE TRIGGER chat_delete_trigger
BEFORE DELETE ON tblChat
FOR EACH ROW
BEGIN
  UPDATE tblConversation SET isDeleted = true WHERE conversationId = OLD.conversationId;
END;

-- Create a trigger for LocationEntity
CREATE TRIGGER location_delete_trigger
BEFORE DELETE ON tblLocation
FOR EACH ROW
BEGIN
  UPDATE tblAccount SET isDeleted = true WHERE locationId = OLD.locationId;
END;

-- Create a trigger for ProductServiceEntity
CREATE TRIGGER product_service_delete_trigger
BEFORE DELETE ON tblProduct_service
FOR EACH ROW
BEGIN
  UPDATE tblStore SET isDeleted = true WHERE storeId = OLD.storeId;
END;

-- Create a trigger for StoreEntity
CREATE TRIGGER store_delete_trigger
BEFORE DELETE ON tblStore
FOR EACH ROW
BEGIN
  UPDATE tblAccount SET isDeleted = true WHERE storeId = OLD.storeId;
  UPDATE tblProduct_service SET isDeleted = true WHERE storeId = OLD.storeId;
END;

-- Create a trigger for TransactionEntity
CREATE TRIGGER transaction_delete_trigger
BEFORE DELETE ON tblTransaction
FOR EACH ROW
BEGIN
  UPDATE tblAccount SET isDeleted = true WHERE accountId = OLD.accountCustomerId OR accountId = OLD.accountVendorId;
END;

-- Create a trigger for UserEntity
CREATE TRIGGER user_delete_trigger
BEFORE DELETE ON tblUser
FOR EACH ROW
BEGIN
  UPDATE tblAccount SET isDeleted = true WHERE accountId = OLD.accountId;
END;

-- Create a trigger for ReportEntity
CREATE TRIGGER report_delete_trigger
BEFORE DELETE ON tblReport
FOR EACH ROW
BEGIN
  UPDATE tblAccount SET isDeleted = true WHERE accountId = OLD.senderId;
END;

DELIMITER ;
