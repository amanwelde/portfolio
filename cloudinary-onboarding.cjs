const cloudinary = require('cloudinary').v2;

// 1. Configure Cloudinary with inline credentials
cloudinary.config({
  cloud_name: 'dnzfuclt1',
  api_key: '236478327944923',
  api_secret: 'rlS1X_TEldTMydSsJq7TVESAQ-4'
});

async function runOnboarding() {
  try {
    console.log('Uploading sample image...');
    
    // 2. Upload an image from Cloudinary's demo domain
    const uploadResult = await cloudinary.uploader.upload(
      'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      { public_id: 'my_first_upload' }
    );
    
    console.log('\n--- Upload Success ---');
    console.log('Secure URL:', uploadResult.secure_url);
    console.log('Public ID:', uploadResult.public_id);
    
    // 3. Get image details
    console.log('\n--- Image Details ---');
    console.log('Width:', uploadResult.width, 'px');
    console.log('Height:', uploadResult.height, 'px');
    console.log('Format:', uploadResult.format);
    console.log('File Size:', uploadResult.bytes, 'bytes');
    
    // 4. Transform the image
    // f_auto: Automatically delivers the image in the most efficient format for the browser
    // q_auto: Automatically adjusts the compression quality to reduce file size without losing visual fidelity
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: 'auto',
      quality: 'auto'
    });
    
    console.log('\n--- Final Success ---');
    console.log('Done! Click link below to see optimized version of the image. Check the size and the format.');
    console.log(transformedUrl);

  } catch (error) {
    console.error('\nError during onboarding script:', error);
  }
}

runOnboarding();
