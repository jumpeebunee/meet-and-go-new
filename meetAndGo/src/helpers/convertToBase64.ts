
export default (file: File) => new Promise((resolve, reject) => {
	const reader = new FileReader()
	reader.onload = (res) => resolve(res.target?.result);
	reader.onerror = (err) => reject(err)
	reader.readAsDataURL(file)
})