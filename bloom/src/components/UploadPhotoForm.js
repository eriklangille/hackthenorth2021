import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import axios from 'axios';
import { useHistory } from 'react-router';

export function UploadPhotoForm({ destinationUrl }) {
	const [acceptedFiles, setAcceptedFiles] = useState([])
	const history = useHistory()

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
			{acceptedFiles.length === 0 ? null : <button className="primary-button" onClick={async (e) => {
				e.stopPropagation()
				await Promise.all(acceptedFiles.map(async (f) => {
					const formData = new FormData()
					formData.append(
						"file", f, f
					)
					await axios.post(destinationUrl, formData)
				}))
				history.go(0)
			}}>Upload</button>}
		</div>
	)
}