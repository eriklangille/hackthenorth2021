import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import axios from 'axios';

export function UploadPhotoForm({ destinationUrl }) {
	const onDrop = useCallback(async acceptedFiles => {
		const formData = new FormData()
		formData.append(
			"file", acceptedFiles[0], acceptedFiles[0].name
		)
		axios.post(destinationUrl, formData)
	}, [])
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			{
				isDragActive ?
					<p>Drop the files here ...</p> :
					<p>Drag 'n' drop some files here, or click to select files</p>
			}
		</div>
	)
}