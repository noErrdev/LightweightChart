export async function loadSponsors() {
      // Import all images from the public/sponsors directory
      const modules = import.meta.glob('/public/sponsors/*.jpg', { eager: true });
    
      // Extract sponsor names and image paths
      const sponsors = Object.keys(modules).map(filePath => {
        const name = filePath.replace('/public/sponsors/sponsor_', '').replace('.jpg', '');
        return {
          name,
          image: modules[filePath].default,
        };
      });
    
      return sponsors;
    }