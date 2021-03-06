const { BlobServiceClient } = require("@azure/storage-blob");
const { v4: uuidv4 } = require('uuid');

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION);

exports.uploadBlob = async (content, contentType = "txt") => {
	// Create a container beforehand and put the name in the .env
	const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_BLOB_CONTAINER_NAME);

	const blobName = uuidv4() + "." + contentType;
	const blockBlobClient = containerClient.getBlockBlobClient(blobName);
	const uploadBlobResponse = await blockBlobClient.upload(content, content.length);

	const url = containerClient.url + "/" + blobName
	return url
}

exports.listBlob = async () => {
	const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_BLOB_CONTAINER_NAME);
  for await (const blob of containerClient.listBlobsFlat())
  {
    console.log(`Blob ${blob.name} ${blob.properties.contentType}`)
  }
}
