const AWS = require('aws-sdk');

exports.handler = async (event) => {
  // Set the region where the S3 bucket is located
  AWS.config.update({region: 'eu-central-1'});

  // Create an S3 client
  const s3 = new AWS.S3();

  // Set the parameters for the listObjects method
  const params = {
    Bucket: 'BUCKET_NAME'
  };

  // Use the listObjects method to get a list of the files in the bucket
  const data = await s3.listObjects(params).promise();

  // Get the list of files from the response
  const files = data.Contents;

  // Print the names of the files to the console
  console.log('Files:');
  files.forEach((file) => {
    console.log(file.Key);
  });

  // Return a success response
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'List of files in bucket.',
      files: files
    })
  };
};