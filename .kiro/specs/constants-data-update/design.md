# Design Document: Constants Data Update

## Overview

This feature updates the `data/constants.ts` file to incorporate accurate organizational information from official company documents and integrate actual event images. The design maintains backward compatibility while enhancing data accuracy and adding event image support.

## Architecture

The changes follow the existing data layer pattern:
- **Data Layer** (`data/constants.ts`): Contains all static organizational data
- **Type Layer** (`types/index.ts`): May need new interfaces for enhanced event data
- **Component Layer**: No changes needed - components will consume updated data through existing imports

No new architectural components are needed - this is an enhancement to existing data structures.

## Components and Interfaces

### Enhanced Event Interface

```typescript
export interface Event {
  id: string;
  title: string;
  titleAm?: string;  // Amharic title
  date: string;      // Format: "YYYY-MM-DD" or "Month DD, YYYY"
  description: string;
  descriptionAm?: string;  // Amharic description
  image?: string;    // Path to event image
  category?: 'past' | 'upcoming';
  location?: string;
}
```

### Updated Constants Structure

The constants file will maintain its current structure with these enhancements:

1. **Organization Info**: Updated with data from official documents
   - Accurate mission statement from "Vision, Goals and Missions.docx"
   - Correct vision statement
   - Verified founding year and historical data
   - Goals extracted from official documents

2. **Event Data**: New structure for events with images
   - Past events with actual event images from `public/assets/event image`
   - Upcoming events (can use placeholder or no image)
   - Bilingual support (English/Amharic)

3. **Program Information**: Aligned with project proposals
   - Programs from "Project Title.docx" and project proposals
   - Accurate descriptions matching official documentation

## Data Models

### Event Image Mapping

Available event images in `public/assets/event image/`:
- `photo_1_2025-12-28_14-29-59.jpg`
- `photo_2_2025-12-28_14-29-59.jpg`
- `photo_3_2025-12-28_14-29-59.jpg`
- `photo_4_2025-12-28_14-29-59.jpg`
- `photo_5_2025-12-28_14-29-59.jpg`

These images will be mapped to past events in the events array.

### Data Extraction Plan

Since Word documents cannot be directly parsed, the implementation will require manual extraction:

1. **From "Vision, Goals and Missions.docx"**:
   - Extract mission statement
   - Extract vision statement
   - Extract organizational goals
   - Extract tagline/motto

2. **From "Project Title.docx" and project proposals**:
   - Extract program names
   - Extract program descriptions
   - Extract target beneficiaries
   - Extract service areas

3. **From organizational bylaws** (የቦርድ_መር_ድርጅት_ሞዴል_መተዳደሪያ_ደንብ_final_1.docx):
   - Verify official organization name
   - Extract founding date
   - Extract governance structure info

### Updated Constants File Structure

```typescript
// Enhanced organization info
export const organizationInfo = {
  name: string,
  nameAm: string,  // Amharic name
  shortName: string,
  tagline: string,
  taglineAm: string,
  foundedYear: number,
  yearsOfService: number,
  description: string,
  descriptionAm: string,
  mission: string,
  missionAm: string,
  vision: string,
  visionAm: string,
  goals: string[],  // Array of organizational goals
};

// New events array
export const events: Event[] = [
  // Past events with images
  // Upcoming events
];
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Acceptance Criteria Testing Prework

1.1 WHEN the constants file is updated THEN the system SHALL extract organization name, mission, vision, and goals from the official company documents
Thoughts: This is about the process of updating data, not a runtime property we can test automatically. The correctness depends on manual data entry accuracy.
Testable: no

1.2 WHEN organizational information is displayed THEN the system SHALL use data that matches the official documents
Thoughts: This requires comparing displayed data to source documents, which is a manual verification task.
Testable: no

1.3 WHEN the founded year or historical information is referenced THEN the system SHALL display accurate dates from official records
Thoughts: This is about data accuracy from manual entry, not a computable property.
Testable: no

1.4 WHEN the organization description is shown THEN the system SHALL use language consistent with official vision and mission statements
Thoughts: This is about content accuracy, not a testable property.
Testable: no

1.5 WHEN program information is displayed THEN the system SHALL reflect programs described in official project proposals
Thoughts: This is about content accuracy from manual data entry.
Testable: no

2.1 WHEN event data is defined THEN the system SHALL include references to actual event images from `public/assets/event image` directory
Thoughts: We can test that all event image paths, when defined, point to files that actually exist in the specified directory.
Testable: yes - property

2.2 WHEN event images are displayed THEN the system SHALL use the correct file paths matching existing image files
Thoughts: This is the same as 2.1 - validating that paths point to existing files.
Testable: yes - property (covered by 2.1)

2.3 WHEN new events are added THEN the system SHALL follow a consistent structure including title, date, description, and image path
Thoughts: We can test that all event objects have the required fields and that optional fields follow the correct pattern.
Testable: yes - property

2.4 WHEN the events array is rendered THEN the system SHALL display events with their associated images
Thoughts: This is about UI rendering, which is tested through the image path validation in 2.1.
Testable: no (UI concern, covered by 2.1)

2.5 WHEN an event image path is invalid THEN the system SHALL handle the error gracefully with a fallback image
Thoughts: This is about error handling in components, not the data structure itself. This would be tested at the component level.
Testable: no (component-level concern)

3.1 WHEN the constants file is modified THEN the system SHALL preserve all existing TypeScript interfaces and types
Thoughts: TypeScript compilation will catch type errors. We can verify that the file compiles without errors.
Testable: yes - example (compilation check)

3.2 WHEN new data fields are added THEN the system SHALL maintain backward compatibility with components using the constants
Thoughts: This is about ensuring existing imports still work. TypeScript compilation and existing tests will catch breaking changes.
Testable: yes - example (existing tests pass)

3.3 WHEN event data structure is created THEN the system SHALL include proper TypeScript typing
Thoughts: TypeScript will enforce this at compile time.
Testable: yes - example (compilation check)

3.4 WHEN constants are exported THEN the system SHALL maintain the existing export pattern for easy imports
Thoughts: We can verify that all expected exports are present and accessible.
Testable: yes - property

3.5 WHEN data is updated THEN the system SHALL ensure no breaking changes to components consuming the constants
Thoughts: Existing tests will catch this. We can verify all existing tests still pass.
Testable: yes - example (regression testing)

4.1 WHEN event data is structured THEN the system SHALL use clear, self-documenting field names
Thoughts: This is a code quality concern, not a testable property.
Testable: no

4.2 WHEN dates are stored THEN the system SHALL use a consistent, human-readable format
Thoughts: We can test that all date strings follow a consistent format pattern.
Testable: yes - property

4.3 WHEN event descriptions are added THEN the system SHALL support both English and Amharic text
Thoughts: We can verify that the structure allows for both English and Amharic fields.
Testable: yes - example (structure check)

4.4 WHEN the constants file is reviewed THEN the system SHALL include comments explaining each data section
Thoughts: This is about code documentation quality, not a runtime property.
Testable: no

4.5 WHEN image paths are specified THEN the system SHALL use relative paths from the public directory
Thoughts: We can test that all image paths start with the correct prefix and don't use absolute URLs.
Testable: yes - property

### Property Reflection

After reviewing all testable properties:

- **Property 2.1 and 2.2** are redundant - both validate that image paths point to existing files. Combine into Property 1.
- **Property 3.1, 3.3, and 3.5** all relate to TypeScript compilation and existing tests passing. Combine into Property 2.
- **Property 4.2 and 4.5** both validate string format patterns. Keep separate as they test different aspects.
- **Property 2.3 and 3.4** both validate data structure completeness. Keep separate as they test different structures.

### Correctness Properties

### Property 1: Event image paths reference existing files
*For any* event object with a defined image path, that path SHALL point to an actual file in the `public/assets/event image` directory or other valid image location.
**Validates: Requirements 2.1, 2.2**

### Property 2: Date format consistency
*For any* event object, the date field SHALL follow a consistent format pattern (either "YYYY-MM-DD" or "Month DD, YYYY").
**Validates: Requirements 4.2**

### Property 3: Event structure completeness
*For any* event object in the events array, it SHALL contain at minimum the required fields: id, title, date, and description.
**Validates: Requirements 2.3**

### Property 4: Image path format
*For any* image path string in the constants file, it SHALL use a relative path starting with "/assets/" and SHALL NOT use absolute URLs or external domains.
**Validates: Requirements 4.5**

### Property 5: Export completeness
*For any* constant that was exported in the original file, it SHALL remain exported after updates to maintain backward compatibility.
**Validates: Requirements 3.4**

## Error Handling

| Scenario | Handling |
|----------|----------|
| Missing event image file | Component-level fallback to placeholder image |
| Invalid date format | Validation during data entry, TypeScript type checking |
| Missing required event fields | TypeScript compilation error |
| Broken export | TypeScript compilation error, caught by existing tests |
| Invalid image path format | Caught by property-based tests |

## Testing Strategy

### Unit Tests
- Test that constants file exports all expected objects
- Test that event data structure matches Event interface
- Verify TypeScript compilation succeeds
- Verify existing component tests still pass (regression testing)

### Property-Based Tests
Using `fast-check` for TypeScript:

1. **Property 1 Test**: For all events with image paths, verify the file exists in the filesystem
2. **Property 2 Test**: Generate event objects and verify all dates match one of the allowed format patterns
3. **Property 3 Test**: Generate event objects and verify all required fields are present and non-empty
4. **Property 4 Test**: For all image paths in constants, verify they start with "/assets/" and don't contain "http"
5. **Property 5 Test**: Verify all original exports are still present in the updated file

### Test Configuration
- Property tests should run minimum 100 iterations
- Each property test must reference the corresponding correctness property using format: `**Feature: constants-data-update, Property {number}: {property_text}**`

### Manual Verification
- Review extracted data against source documents for accuracy
- Verify Amharic text displays correctly
- Check that event images display properly in UI components

## Implementation Notes

### Data Extraction Process

Since Word documents cannot be automatically parsed, the implementation will follow this process:

1. **Manual Document Review**: Developer opens each Word document and extracts relevant information
2. **Data Entry**: Extracted information is typed into the constants file
3. **Verification**: Property-based tests verify structural correctness
4. **Manual Review**: Stakeholder reviews displayed data for accuracy

### Bilingual Support

The design includes optional Amharic fields for:
- Organization name
- Tagline
- Description
- Mission
- Vision
- Event titles and descriptions

This allows the website to display content in both English and Amharic based on user locale selection.

### Migration Strategy

To ensure smooth transition:
1. Keep all existing fields to maintain backward compatibility
2. Add new fields as optional
3. Run existing tests to catch any breaking changes
4. Update components gradually to use new fields (separate task)
