## Tasks

### Initial Setup

#### 1. Set Up DXF Data Parsing

- [ ] **Objective**: Ensure the DXF file is parsed and data is available for rendering.
- [ ] **Steps**:
  - [ ] Set up the Flask module to parse DXF files and return structured data.
  - [ ] Create API endpoints in the Flask module to serve parsed data to the React application.
  - [ ] Ensure the React application can send the chosen DXF file to the Flask module and receive parsed data in response.

#### 2. Integrate Flask Module with React App

- [ ] **Objective**: Integrate the Flask module with the React application to handle DXF file selection and data fetching.
- [ ] **Steps**:
  - [ ] Modify the file upload component to send the selected DXF file to the Flask API.
  - [ ] Update the main content component to fetch and display parsed data from the Flask module.

### Subsequent Features

#### 3. Implement Hierarchy of Objects in the Scene

- [ ] **Objective**: Display a hierarchical tree view of all objects in the DXF file.
- [ ] **Steps**:
  - [ ] Extend the DXF parser to categorize objects into a hierarchy.
  - [ ] Create a tree view component in the sidebar to display the hierarchy.
  - [ ] Enable clicking on items in the tree to highlight corresponding objects in the viewer.

#### 4. Create Object Properties Panel

- [ ] **Objective**: Display properties and metadata for the selected object.
- [ ] **Steps**:
  - [ ] Implement object selection in the DXF view.
  - [ ] Create a properties panel to display object properties.
  - [ ] Allow editable fields for certain properties (e.g., color, line type).

#### 5. Add Zoom and Pan Controls

- [ ] **Objective**: Enhance navigation within the DXF viewer.
- [ ] **Steps**:
  - [ ] Implement mouse wheel zooming and drag panning.
  - [ ] Add UI buttons for zooming in/out and panning.
  - [ ] Include a button to zoom to the extents of the drawing.

#### 6. Implement Layer Control

- [ ] **Objective**: Toggle the visibility of different layers in the DXF file.
- [ ] **Steps**:
  - [ ] Extract layer information from the DXF file.
  - [ ] Create checkboxes or toggles for each layer in the UI.
  - [ ] Allow users to change layer colors for better visualization.

#### 7. Develop Measurement Tools

- [ ] **Objective**: Measure distances, angles, and areas within the DXF viewer.
- [ ] **Steps**:
  - [ ] Implement tools for measuring distances and angles.
  - [ ] Display measurement results in a tooltip or dedicated panel.
  - [ ] Add tools for area measurement if applicable.

#### 8. Enhance Cursor Coordinates

- [ ] **Objective**: Improve the cursor coordinates box with more features.
- [ ] **Steps**:
  - [ ] Implement snapping to grid points, endpoints, and midpoints.
  - [ ] Allow unit conversion (e.g., inches, millimeters).
  - [ ] Include additional data such as polar coordinates and relative coordinates.

#### 9. Optimize Rendering

- [ ] **Objective**: Improve rendering performance for larger DXF files.
- [ ] **Steps**:
  - [ ] Implement Level of Detail (LOD) techniques.
  - [ ] Group objects for batch rendering to reduce draw calls.
  - [ ] Load and render parts of the DXF file asynchronously.