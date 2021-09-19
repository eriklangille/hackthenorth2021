import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import axios from 'axios';

export function UploadPhotoForm({ destinationUrl }) {
	const [acceptedFiles, setAcceptedFiles] = useState([])

	const onDrop = useCallback(async acceptedFiles => {
		setAcceptedFiles(acceptedFiles)
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
			<div>
				{acceptedFiles.map(f => (
					<div>{f.name}</div>
				))}
			</div>
			{acceptedFiles.length === 0 ? null : <button className="primary-button" onClick={(e) => {
				e.stopPropagation()
				acceptedFiles.forEach((f) => {
					const formData = new FormData()
					formData.append(
						"file", f, f
					)
					axios.post(destinationUrl, formData)
				})
			}}>Upload</button>}
		</div>
	)
}