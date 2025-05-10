const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;
console.log(baseUrl);

export const getBooks = (onSuccess, onError) => {
    fetch(`${baseUrl}/books`, {
        headers: {
        "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`
        }
    })
    .then(async res => {
        if(!res.ok){
            const errData = await res.json();
            throw new Error (errData.message || "Algo ha salido mal");
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
};

export const addBook = (newBook, onSuccess, onError) => {
    fetch(`${baseUrl}/books`, {
        headers: {
            "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newBook)
    })
    .then(async res => {
        if(!res.ok){
            const errData = await res.json();
            throw new Error(errData.message || "Algo ha salido mal");
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError)
};

export const deleteBook = (bookId, onSuccess, onError) => {
    fetch(`${baseUrl}/books/${bookId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`
        }
    })
    .then(onSuccess)
    .catch(onError)
};

export const loginUser = (email, password, onSuccess, onError) => {
    fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(async res => {
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || "Algo ha salido mal");
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
};