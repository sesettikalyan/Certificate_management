export default function CertificateList() {
    const certificate = [
        { id: 1, name: 'Certificate 1' },
        { id: 2, name: 'Certificate 2' },
        { id: 3, name: 'Certificate 3' },
        { id: 4, name: 'Certificate 4' },
        { id: 5, name: 'Certificate 5' },

    ]
    return (
        <div>
            <h1>Certificate List</h1>
            {certificate.map((certificate) => (
                <div key={certificate.id}>
                    <p>Name: {certificate.name}</p>
                    <p>ID: {certificate.id}</p>
                </div>

            ))}
        </div>
    )
}