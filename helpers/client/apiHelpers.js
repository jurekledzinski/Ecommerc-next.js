const optionsPost = (token, data) => ({
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(data),
});

const optionsPostWithout = (data) => ({
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

const optionsPut = (token, data) => ({
  method: 'PUT',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(data),
});

const optionsPatch = (token, data) => ({
  method: 'PATCH',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(data),
});

const optionsPostFile = (token, data) => ({
  method: 'POST',
  credentials: 'include',
  headers: {
    authorization: `Bearer ${token}`,
  },
  body: data,
});

const optionsGet = (token) => ({
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
});

const optionsDelete = (token) => ({
  method: 'DELETE',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
});

const wrapperTryCatchGet = (fn) => {
  return async (url, token, setErrorMsg) => {
    try {
      const result = await fn(url, token, setErrorMsg);
      return result;
    } catch (error) {
      setErrorMsg('Something went wrong! Please try later');
    }
  };
};

const wrapperTryCatch = (fn) => {
  return async (url, data, token, setErrorMsg) => {
    try {
      const result = await fn(url, data, token, setErrorMsg);
      return result;
    } catch (error) {
      setErrorMsg('Something went wrong! Please try later');
    }
  };
};

const wrapperTryCatchPostCart = (fn) => {
  return async (url, data, setErrorMsg) => {
    try {
      const result = await fn(url, data, setErrorMsg);
      return result;
    } catch (error) {
      setErrorMsg('Error post cart register');
    }
  };
};

export const createCart = wrapperTryCatchPostCart(
  async (url = '', data = {}, setErrorMsg) => {
    const response = await fetch(url, optionsPostWithout(data));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);

export const addCart = wrapperTryCatch(
  async (url = '', data = {}, token, setErrorMsg) => {
    const response = await fetch(url, optionsPatch(token, data));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);

export const getCart = wrapperTryCatchGet(
  async (url = '', token, setErrorMsg) => {
    const response = await fetch(url, optionsGet(token));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);

export const addUpdateProfile = wrapperTryCatch(
  async (url = '', data = {}, token, setErrorMsg) => {
    const response = await fetch(url, optionsPatch(token, data));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);

export const getProfile = wrapperTryCatchGet(
  async (url = '', token, setErrorMsg) => {
    const response = await fetch(url, optionsGet(token));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);

export const addOrderDetails = wrapperTryCatch(
  async (url = '', data = {}, token, setErrorMsg) => {
    const response = await fetch(url, optionsPatch(token, data));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);

export const getOrderDetails = wrapperTryCatchGet(
  async (url = '', token, setErrorMsg) => {
    const response = await fetch(url, optionsGet(token));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);

export const createCheckout = wrapperTryCatch(
  async (url = '', data = {}, token, setErrorMsg) => {
    const response = await fetch(url, optionsPost(token, data));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);

export const getKey = wrapperTryCatchGet(
  async (url = '', token, setErrorMsg) => {
    const response = await fetch(url, optionsGet(token));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);

export const addPaidOrder = wrapperTryCatch(
  async (url = '', data = {}, token, setErrorMsg) => {
    const response = await fetch(url, optionsPut(token, data));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);

export const updateProductsStock = wrapperTryCatch(
  async (url = '', data = {}, token, setErrorMsg) => {
    const response = await fetch(url, optionsPatch(token, data));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);

export const sendEmail = wrapperTryCatch(
  async (url = '', data = {}, token, setErrorMsg) => {
    const response = await fetch(url, optionsPost(token, data));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);

export const addImageProfile = wrapperTryCatch(
  async (url = '', data = {}, token, setErrorMsg) => {
    const response = await fetch(url, optionsPostFile(token, data));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);

export const addReview = wrapperTryCatch(
  async (url = '', data = {}, token, setErrorMsg) => {
    const response = await fetch(url, optionsPost(token, data));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);

export const getReviews = wrapperTryCatchGet(
  async (url = '', token, setErrorMsg) => {
    const response = await fetch(url, optionsGet(token));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);

export const updateReview = wrapperTryCatch(
  async (url = '', data = {}, token, setErrorMsg) => {
    const response = await fetch(url, optionsPatch(token, data));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);

export const deleteReview = wrapperTryCatchGet(
  async (url = '', token, setErrorMsg) => {
    const response = await fetch(url, optionsDelete(token));
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      setErrorMsg(result.msgError);
    }
  }
);
