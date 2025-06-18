# Images Directory Structure

## How to Add Images to Your Lab Website

### Team Member Photos
- **Location**: `src/assets/images/team/`
- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 300x300px or larger (square format works best)
- **Naming**: Use lowercase with hyphens (e.g., `sarah-johnson.jpg`)

**To add a team member photo:**
1. Save your image in `src/assets/images/team/`
2. In `src/pages/Team.jsx`, update the `imageUrl` field:
   ```javascript
   imageUrl: "/src/assets/images/team/your-photo-name.jpg"
   ```
3. Set to `null` to show placeholder

### Hero/Background Images
- **Location**: `src/assets/images/hero/`
- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 1200x800px or larger
- **Current**: Using Unsplash URL in `src/pages/Home.css`

**To change the main page background:**
1. Save your laboratory image in `src/assets/images/hero/`
2. In `src/pages/Home.css`, update the background-image URL:
   ```css
   background-image: url('/src/assets/images/hero/your-lab-image.jpg');
   ```

### Image Optimization Tips
- Use compressed images for better loading speeds
- Square photos work best for team member circles
- Landscape photos work best for hero backgrounds
- Consider using WebP format for better compression

### Current Image Locations
- **Main page background**: External Unsplash URL (currently)
- **Team photos**: Placeholder system ready for your images
- **All assets**: Should go in `src/assets/images/` for proper bundling
