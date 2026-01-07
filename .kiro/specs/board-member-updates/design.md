# Design Document: Board Member Updates

## Overview

This feature updates the board member functionality to:
1. Correct photo paths to match actual image files in the `public/assets/Members Photo` directory
2. Extend the `BoardMember` type to include optional `title` and `degree` fields
3. Update the `BoardMembers` component to display professional credentials

## Architecture

The changes follow the existing architecture pattern:
- **Data Layer** (`data/boardMembers.ts`): Contains board member information
- **Type Layer** (`types/index.ts`): Defines the `BoardMember` interface
- **Component Layer** (`components/about/BoardMembers.tsx`): Renders board member cards

No new architectural components are needed - this is an enhancement to existing structures.

## Components and Interfaces

### Updated BoardMember Interface

```typescript
export interface BoardMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio?: string;
  order: number;
  title?: string;    // NEW: Professional title (e.g., "Dr.", "Prof.")
  degree?: string;   // NEW: Educational credentials (e.g., "PhD in Medicine")
}
```

### BoardMemberCard Component Updates

The existing `BoardMemberCard` component will be updated to:
1. Display title before the name (if present)
2. Display degree below the role (if present)

```tsx
// Updated display logic
<h3 className="text-xl font-bold text-gray-900">
  {member.title && `${member.title} `}{member.name}
</h3>
<p className="text-brand-teal font-medium">{member.role}</p>
{member.degree && (
  <p className="text-gray-600 text-sm">{member.degree}</p>
)}
```

## Data Models

### Board Member Photo Path Mapping

Current files in `public/assets/Members Photo/`:
| Member Name | Actual File |
|-------------|-------------|
| Assefu Teshome Woldehawarit | `Assefu Teshome Woldehawarit.jpg` |
| Bezawit Tilaye Tiruneh | `Bezawit Tilaye Tiruneh.jpg` |
| Dr Robel Wasihun Gebremedhin | `Dr Robel Wasihun Gebremedhin.jpg` |
| Fikrte Hailu G/Welde | `Fikrte Hailu  GWelde.jpg` (note: double space) |
| Konget Moges Ketema | `Konget Moges ketema.jpg` (lowercase 'k') |
| Sofia Oumer Kedir | `Sofia Oumer Kedir.jpg` |
| Solomon Eshete Kassaye | `Solomon Eshete kassaye.jpg` (lowercase 'k') |
| Tesfaye Hailu Tesfaye | `Tesfaye Hailu Tesfaye.jpg` |
| Tigist Tilahun Tenange | `Tigist Tilahun Tenange.jpg` |

Note: Some members (Henok Tenkir Fuji, Marta Deneke Birre) may not have matching photos - they will use placeholder avatars.

### Updated Board Members Data Structure

Each board member entry will include:
- Corrected `photo` path matching actual filename
- Optional `title` field for professional designation
- Optional `degree` field for educational credentials

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Initials Generation Consistency
*For any* board member name string, the `getInitials` function SHALL produce a string of exactly 1-2 uppercase letters derived from the first characters of the name parts.
**Validates: Requirements 1.2**

### Property 2: Title Prepending
*For any* board member with a defined title, the displayed name SHALL be the concatenation of the title, a space, and the name. For any board member without a title, the displayed name SHALL be exactly the name.
**Validates: Requirements 2.1, 2.3**

### Property 3: Optional Field Handling
*For any* board member object, if the `degree` field is undefined or empty, no degree element SHALL be rendered. If the `degree` field has a value, that value SHALL appear in the rendered output.
**Validates: Requirements 2.3**

## Error Handling

| Scenario | Handling |
|----------|----------|
| Photo file not found | Display placeholder avatar with initials |
| Missing title field | Display name without title prefix |
| Missing degree field | Omit degree line from display |
| Image load error | Fallback to placeholder via `onError` handler |

## Testing Strategy

### Unit Tests
- Test `getInitials` function with various name formats
- Test component rendering with complete and partial board member data

### Property-Based Tests
Using a property-based testing library (e.g., `fast-check` for TypeScript):

1. **Property 1 Test**: Generate random name strings and verify initials are always 1-2 uppercase characters
2. **Property 2 Test**: Generate board member objects with/without titles and verify correct name display format
3. **Property 3 Test**: Generate board member objects with/without degrees and verify conditional rendering

### Test Configuration
- Property tests should run minimum 100 iterations
- Each property test must reference the corresponding correctness property using format: `**Feature: board-member-updates, Property {number}: {property_text}**`
