import app from "./firebase";

export async function fetchApi(url: string, opts?: any) {
    const { method, body }: any = { method: 'POST', body: null, ...opts };

    const user = app.auth().currentUser;
    const token = user && (await user.getIdToken())

    const res = await fetch(`http://localhost:3000/api/${url}`, {
        method,
        ...(body && { body: JSON.stringify(body) }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })

    return res.json()
}