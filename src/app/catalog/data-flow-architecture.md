## Data Props Flow in Catalog chain

### minMaxResult
The `minMaxResult` data follows a hierarchical flow from database query to UI render:

1. **Database Query (Highest Level)**
   - Located in: `src/app/catalog/page.tsx`
   - The `minMaxResult` is fetched using Prisma's aggregate function to get minimum and maximum values for vehicle attributes:
     ```typescript
     const minMaxResult = await prisma.classified.aggregate({
       where: { status: ClassifiedStatus.LIVE },
       _min: { year: true, price: true, odoReading: true },
       _max: { price: true, year: true, odoReading: true }
     })
     ```

2. **Page to Main Component**
   - The aggregated data is passed as a prop to the Catalog component:
     ```typescript
     <Catalog
       template="catalog-2"
       minMaxValues={minMaxResult}
       ...other props
     />
     ```

3. **Main Catalog Component**
   - Located in: `src/components/catalog/index.tsx`
   - The Catalog component acts as a router, passing props to template-specific components:
     ```typescript
     export function Catalog({ template, minMaxValues, ...props }) {
       // Props are organized based on template type (catalog1Props or catalog2Props)
       switch (template) {
         case 'catalog-1': return <Catalog1 {...catalog1Props} />
         case 'catalog-2': return <Catalog2 {...catalog2Props} />
         default: return <Catalog2 {...catalog2Props} />
       }
     }
     ```

4. **Template Component**
   - Located in: `src/components/catalog/templates/catalog-1.tsx` or `catalog-2.tsx`
   - The template component distributes the props to both filter panel and content panel:
     ```typescript
     // In Catalog2 component
     <FiltersPanel
       template="template-2"
       minMaxValues={minMaxValues}
       ...other props
     />
     <ContentPanel
       template="template-2"
       minMaxValues={minMaxValues}
       ...other props
     />
     ```

5. **Filters Panel Component**
   - Located in: `src/components/catalog/archive/filters-panel/template-2/index.tsx`
   - The FiltersPanel component passes props to its body component:
     ```typescript
     <PanelBody minMaxValues={minMaxValues} searchParams={searchParams} />
     ```

6. **Panel Body Component**
   - Located in: `src/components/catalog/archive/filters-panel/template-1/body.tsx` (or template-2)
   - The PanelBody component passes the data to filter controls:
     ```typescript
     <SidebarFilterControls
       minMaxValues={minMaxValues}
       searchParams={searchParams}
       ...other props
     />
     ```

7. **Filter Controls Component**
   - Located in: `src/components/filters/controls/filter-controls.tsx`
   - This component destructures minMaxValues and uses the data to set default minimums and maximums for range filters:
     ```typescript
     const { _min, _max } = minMaxValues
     
     <RangeFilter
       label="Year"
       minName="minYear"
       maxName="maxYear"
       defaultMin={_min.year || 1925}
       defaultMax={_max.year || new Date().getFullYear()}
       ...other props
     />
     ```

8. **Range Filter Component**
   - Located in: `src/components/filters/range-filters.tsx`
   - The RangeFilter uses the min/max values to generate options using a hook:
     ```typescript
     const { minOptions, maxOptions } = useRangeOptions({
       defaultMin,
       defaultMax,
       ...other props
     })
     ```

9. **useRangeOptions Hook (State Processing)**
   - Located in: `src/hooks/filters/useRangeOptions.ts`
   - This hook processes the min/max values to generate selectable options:
     ```typescript
     const getInitialState = () => {
       const state: FilterOptions<string, number> = []
       let iterator = defaultMin - (increment ?? 1)
       // Builds an array of options from min to max
       do {
         // Increment and format options
       } while (iterator < defaultMax)
       return state
     }
     ```

10. **RangeSelect UI Component (Final Render)**
    - Located in: `src/components/ui/range-select.tsx`
    - The lowest level component that renders the UI elements allowing users to select minimum and maximum values:
      ```typescript
      <Select value={minSelect.value?.toString() || '_empty'}>
        <SelectContent>
          {minSelect.options.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      ```

**Visual Data Flow Diagram**
```
                          +-------------------+
                          | CatalogPage       |
                          | minMaxResult = {} |
                          +--------+----------+
                                   |
                                   | minMaxValues={minMaxResult}
                                   v
                          +-------------------+
                          | Catalog Component |
                          | (index.tsx)       |
                          +--------+----------+
                                   |
                                   | Template-based routing
                                   v
                     +----------------------------+
                     | Catalog1/Catalog2 Template |
                     +------------+---------------+
                                  |
                      +-----------+------------+
                      |                        |
                      v                        v
            +-----------------+     +------------------+
            | FiltersPanel    |     | ContentPanel     |
            | Component       |     | Component        |
            +--------+--------+     +------------------+
                     |
                     v
            +-----------------+
            | PanelBody       |
            | Component       |
            +--------+--------+
                     |
                     v
            +-----------------+
            | SidebarFilter   |
            | Controls        |
            +--------+--------+
                     |
                     | destructure { _min, _max }
                     v
            +-----------------+
            | RangeFilter     |--+
            | Components      |  | defaultMin={_min.x}
            +-----------------+  | defaultMax={_max.x}
                     |           |
                     v           |
            +-----------------+  |
            | useRangeOptions |<-+
            | Hook            |
            +--------+--------+
                     |
                     | { minOptions, maxOptions }
                     v
            +-----------------+
            | RangeSelect     |
            | UI Component    |
            +-----------------+
```

### classifiedsArray

### favouriteIds

