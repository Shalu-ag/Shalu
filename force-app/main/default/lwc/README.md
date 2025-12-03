# Account CRUD LWC Component

A comprehensive Lightning Web Component that provides full CRUD (Create, Read, Update, Delete) operations for Account records using Apex controllers.

## Features

- **Create**: Add new accounts with a dynamic form
- **Read**: Display accounts in a sortable data table with search functionality
- **Update**: Edit existing accounts inline
- **Delete**: Remove accounts with confirmation modal
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: Comprehensive error handling and user feedback
- **Sorting**: Sort by any column
- **Search**: Search accounts by name
- **Toast Notifications**: Success and error messages

## Components

### 1. AccountCRUD LWC Component
- **HTML Template**: `accountCRUD.html` - Main UI layout
- **JavaScript Controller**: `accountCRUD.js` - Component logic and event handling
- **CSS Styling**: `accountCRUD.css` - Custom styling and responsive design
- **Meta XML**: `accountCRUD.js-meta.xml` - Component configuration

### 2. AccountController Apex Class
- **Main Class**: `AccountController.cls` - Server-side logic for all CRUD operations
- **Test Class**: `AccountControllerTest.cls` - Comprehensive test coverage

## Installation

1. Deploy all files to your Salesforce org
2. The component is automatically available for use in:
   - Lightning App Pages
   - Lightning Record Pages
   - Lightning Home Pages
   - Lightning Tabs

## Usage

### Adding to a Lightning Page

1. Go to Setup → Lightning App Builder
2. Edit or create a Lightning page
3. Drag and drop the "Account CRUD" component onto the page
4. Configure component properties if needed
5. Save and activate the page

### Component Properties

- **Title**: Custom title for the component (default: "Account Management")
- **Show Search**: Enable/disable search functionality (default: true)
- **Max Records**: Maximum number of records to display (default: 1000)

## API Methods

### AccountController Apex Methods

#### `getAccounts()`
- **Purpose**: Retrieve all accounts
- **Returns**: List<Account>
- **Cacheable**: Yes
- **Parameters**: None

#### `createAccount(String accountData)`
- **Purpose**: Create a new account
- **Returns**: Account
- **Cacheable**: No
- **Parameters**: 
  - `accountData`: JSON string containing account fields

#### `updateAccount(String accountData)`
- **Purpose**: Update an existing account
- **Returns**: Account
- **Cacheable**: No
- **Parameters**:
  - `accountData`: JSON string containing account fields (must include Id)

#### `deleteAccount(Id accountId)`
- **Purpose**: Delete an account
- **Returns**: Boolean
- **Cacheable**: No
- **Parameters**:
  - `accountId`: ID of the account to delete

#### `searchAccounts(String searchTerm)`
- **Purpose**: Search accounts by name
- **Returns**: List<Account>
- **Cacheable**: Yes
- **Parameters**:
  - `searchTerm`: Search term for account names

#### `getAccountById(Id accountId)`
- **Purpose**: Get a specific account by ID
- **Returns**: Account
- **Cacheable**: Yes
- **Parameters**:
  - `accountId`: ID of the account to retrieve

## Supported Account Fields

The component supports the following Account fields:
- Name (required)
- AccountNumber
- Type
- Industry
- Phone
- Website
- Description
- CreatedDate
- LastModifiedDate

## Security

- **Sharing**: The Apex controller uses `with sharing` to respect org-wide sharing settings
- **Field-Level Security**: Respects field-level security settings
- **Object Permissions**: Users must have appropriate permissions on the Account object

## Error Handling

- Comprehensive error handling for all operations
- User-friendly error messages via toast notifications
- Graceful fallbacks for failed operations
- Input validation and sanitization

## Testing

The component includes comprehensive test coverage:
- Positive test cases for all CRUD operations
- Negative test cases for error scenarios
- Test data setup and cleanup
- Proper assertion statements

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Mobile Support

- Responsive design for mobile devices
- Touch-friendly interface elements
- Optimized layout for small screens

## Performance Considerations

- Lazy loading of data
- Efficient SOQL queries with proper limits
- Client-side sorting and filtering
- Optimized re-rendering

## Troubleshooting

### Common Issues

1. **Component not visible**: Check if the component is properly added to the page
2. **Permission errors**: Ensure users have appropriate Account object permissions
3. **Data not loading**: Check browser console for JavaScript errors
4. **Form submission issues**: Verify required fields are populated

### Debug Mode

Enable debug mode in your org to see detailed error messages and stack traces.

## Contributing

When contributing to this component:
1. Follow Salesforce best practices
2. Maintain test coverage above 90%
3. Update documentation for any new features
4. Follow the existing code style and patterns

## License

This component is provided as-is for educational and development purposes.


