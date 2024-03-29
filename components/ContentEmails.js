export const contentEmailSuccessPaidOrder = (data) => {
  const { cart } = data;
  const { products, totalCartAmount, totalCartPrice } = cart;
  return `
  <table
  role="presentation"
  border="0"
  cellpadding="0"
  cellspacing="0"
  width="100%"
>
  <tr>
    <td style="padding: 20px 0 30px 0">
      <table
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="600"
        style="border-collapse: collapse; border: 1px solid #cccccc"
      >
        <tr>
          <td
            align="left"
            bgcolor="#fff"
            style="
              padding: 0px 0 0px 30px;
              box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 2px 0px;
              border-bottom: 1px solid #ddd;
            "
            width="600"
            height="50"
          >
            <h1
              style="
                font-size: 20px;
                margin: 0;
                font-family: 'Oswald', sans-serif;
                letter-spacing: 1.5px;
              "
            >
              <span style="color: #0074d9">S</span>HOPPY
            </h1>
          </td>
        </tr>
        <tr>
          <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="border-collapse: collapse;""
            >
              <tr>
                <td
                  style="color: #153643; font-family: 'Roboto', sans-serif"
                >
                  <p style="font-size: 16px; margin: 0">
                    Thank you for placing your order with our store.
                  </p>      
                  <h6 style="font-size: 16px;margin: 15px 0 0 0; font-family: 'Oswald', sans-serif;letter-spacing: 1px;color:#555555">
                    ORDER ID: ${data.orderId}
                  </h6>      
                </td>
              </tr>     
              <table width="600" style="border-collapse: collapse; margin-bottom: 10px;">
                <tr>
                  <td
                    style="
                      color: #153643;
                      font-size: 16px;
                      font-family: 'Roboto', sans-serif;
                      padding: 20px 0 10px 0;
                    "
                  >
                    <h5
                      style="
                        font-size: 16px;
                        margin: 0;
                        font-family: 'Oswald', sans-serif;
                        font-weight: 400;
                        letter-spacing: 1px;
                        margin-bottom: 10px;
                      "
                    >
                      Shipping address:
                    </h5>
                    <p style="margin: 0; font-size: 15px">${data.name} ${
    data.surname
  }</p>
                    <p style="margin: 0; font-size: 15px">${data.street}</p>
                    <p style="margin: 0; font-size: 15px">${data.zipCode} ${
    data.city
  }</p>
                    <p style="margin: 0; font-size: 15px">${data.country}</p>
                  </td>
                </tr>
              </table>
              <table
                width="600"
                style="
                  border-collapse: collapse;
                  background-color: #7c7c7c;
                  color: white;
                  font-family: 'Roboto', sans-serif;
                "
              >
                <tr style="line-height: 30px;">
                  <td col-span="2" style="width: 400px;text-indent: 5px;"><p>Products</p></td>
                  <td style="width: 127px; text-align: center;"><p>Amount</p></td>
                  <td style="width: 100px;"><p>Price</p></td>
                </tr>
              </table>
              ${products
                .map(
                  (item, index) =>
                    ` <table
                  key=${index}
                  width="600"
                  style="
                  border-collapse: collapse;
                  background-color: #ffffff;
                  color: #555555;
                  font-family: 'Roboto', sans-serif;
                  margin-top: 10px;
                "
                >
                  <tr style="line-height: 0px;">
                    <td>
                      <img
                        src=${item.imagesSlider[0]}
                        height="30px"
                        style="objectFit: contain; height: 30px; max-width: 30px; min-height: 30px;"
                      />
                    </td>
                    <td col-span="2" style="width: 370px;text-indent: 5px;">
                      <p>${item.name}</p>
                    </td>
                    <td style="width: 120px; text-align: center;">
                      <p>${item.amount - item.onStock}</p>
                    </td>
                    <td style="width: 100px;">
                      <p>${item.price.toFixed(2)}€</p>
                    </td>
                  </tr>
                </table>`
                )
                .join('\n')}
              <table
              width="600"
              style="
                border-collapse: collapse;
                color: #555555;
                font-family: 'Roboto', sans-serif;
                margin-top: 20px;
              "
            >
              <tr style="line-height: 20px;">
                <td col-span="2" style="width: 400px;"><h4>Delivery price:</h4></td>
                <td style="width: 120px; text-align: center;"><h4>${
                  data.deliveryMethod
                }</h4></td>
                <td style="width: 100px;"><h4>${data.deliveryPrice.toFixed(
                  2
                )}€</h4></td>
              </tr>
            </table>
              <table
              width="600"
              style="
                border-collapse: collapse;
                color: #555555;
                font-family: 'Roboto', sans-serif;
              "
            >
              <tr style="line-height: 0px;">
                <td col-span="2" style="width: 400px;"><h4>Total price:</h4></td>
                <td style="width: 120px; text-align: center;"><h4>${totalCartAmount}</h4></td>
                <td style="width: 100px;"><h4>${(
                  totalCartPrice + data.deliveryPrice
                ).toFixed(2)}€</h4></td>
                
              </tr>
            </table>
       
              <tr>
                <td bgcolor="#0074D9" style="padding: 20px 30px">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="border-collapse: collapse"
                  >
                    <tr>
                      <td
                        style="
                          color: #ffffff;
                          font-family: Arial, sans-serif;
                          font-size: 14px;
                        "
                      >
                        <p style="margin: 0">
                          &reg; SHOPPY, All rights reserved &copy; ${new Date().getFullYear()}<br />
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
  `;
};

export const contentEmailContact = (data) => {
  const { email, name, message } = data;
  return `
  <table
  role="presentation"
  border="0"
  cellpadding="0"
  cellspacing="0"
  width="100%"
>
  <tr>
    <td style="padding: 20px 0 30px 0">
      <table
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="600"
        style="border-collapse: collapse; border: 1px solid #cccccc"
      >
        <tr>
          <td
            align="left"
            bgcolor="#fff"
            style="
              padding: 0px 0 0px 30px;
              box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 2px 0px;
              border-bottom: 1px solid #ddd;
            "
            width="600"
            height="50"
          >
            <h1
              style="
                font-size: 20px;
                margin: 0;
                font-family: 'Oswald', sans-serif;
                letter-spacing: 1.5px;
              "
            >
              <span style="color: #0074d9">S</span>HOPPY
            </h1>
          </td>
        </tr>
        <tr>
          <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="border-collapse: collapse;""
            >
              <tr>
                <td
                  style="color: #153643; font-family: 'Roboto', sans-serif"
                >
                  <h6 style="font-size: 16px;margin: 15px 0 0 0; font-family: 'Oswald', sans-serif;letter-spacing: 1px;color:#555555;font-weight: 400;">
                    From:
                  </h6>     
                  <p style="font-size: 14px; margin: 0">
                    Name: ${name}
                  </p>
                  <p style="font-size: 14px; margin: 0">
                    Email: ${email}
                  </p>   
                  <p style="font-size: 14px; margin: 0">
                  Date: ${new Date()
                    .toString()
                    .split(' ')
                    .slice(0, 5)
                    .toString()
                    .replace(/\,/g, ' ')}
                </p>    
                </td>
              </tr>     
              <table width="600" style="border-collapse: collapse; margin-bottom: 10px;">
                <tr>
                  <td
                    style="
                      color: #153643;
                      font-size: 16px;
                      font-family: 'Roboto', sans-serif;
                      padding: 5px 0 10px 0;
                    "
                  >
                    <h5
                      style="
                        font-size: 16px;
                        margin: 0 0 3px 0;
                        font-family: 'Oswald', sans-serif;
                        font-weight: 400;
                        letter-spacing: 1px;
                      "
                    >
                      Message:
                    </h5>
                    <p style="margin: 0; font-size: 14px;text-align: justify;">${message}</p>
                  </td>
                </tr>
              </table>
              <tr>
                <td bgcolor="#0074D9" style="padding: 20px 30px">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="border-collapse: collapse"
                  >
                    <tr>
                      <td
                        style="
                          color: #ffffff;
                          font-family: Arial, sans-serif;
                          font-size: 14px;
                        "
                      >
                        <p style="margin: 0">
                          &reg; SHOPPY, All rights reserved &copy; ${new Date().getFullYear()}<br />
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
  `;
};

export const contentPasswordChange = (data, token, req) => {
  return `
  <table
  role="presentation"
  border="0"
  cellpadding="0"
  cellspacing="0"
  width="100%"
>
  <tr>
    <td style="padding: 20px 0 30px 0">
      <table
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="600"
        style="border-collapse: collapse; border: 1px solid #cccccc"
      >
        <tr>
          <td
            align="left"
            bgcolor="#fff"
            style="
              padding: 0px 0 0px 30px;
              box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 2px 0px;
              border-bottom: 1px solid #ddd;
            "
            width="600"
            height="50"
          >
            <h1
              style="
                font-size: 20px;
                margin: 0;
                font-family: 'Oswald', sans-serif;
                letter-spacing: 1.5px;
              "
            >
              <span style="color: #0074d9">S</span>HOPPY
            </h1>
          </td>
        </tr>
        <tr>
          <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="border-collapse: collapse;""
            >
              <tr>
                <td
                  style="color: #153643; font-family: 'Roboto', sans-serif"
                >
                  <h6 style="font-size: 16px;margin: 15px 0 10px 0; font-family: 'Oswald', sans-serif;letter-spacing: 1px;color:#555555;font-weight: 400;">
                    Change password request:
                  </h6>     
                  <p style="font-size: 14px; margin: 0">
                    We received a request to change the password from user with email ${
                      data.email
                    } If you asked for it, click on the button below but if you didn't ask for a password change, please ignore this message.
                  </p>    
                </td>
              </tr>     
              <table width="600" style="border-collapse: collapse; margin-bottom: 10px;">
                <tr>
                  <td
                    style="
                      color: #153643;
                      font-size: 16px;
                      font-family: 'Roboto', sans-serif;
                      padding: 5px 0 10px 0;
                    "
                  >
                    <table cellspacing="0" cellpadding="0" style="margin-top: 10px;">
                    <tr>
                      <td bgcolor="#0074D9">
                          <a  class=”link” href="https://${
                            req.headers.host
                          }/change_password/${token}" target="_blank" style="
                          display: inline-block;
                          padding: 8px 12px;
                          border: 1px solid #0074D9;
                          font-family: Helvetica, Arial, sans-serif;
                          font-size: 14px;
                          color: #ffffff; 
                          text-decoration: none;
                          font-weight: normal;
                          letter-spacing: 1px;
                      ">
                              Change password         
                          </a>
                      </td>
                    </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <tr>
                <td bgcolor="#0074D9" style="padding: 20px 30px">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="border-collapse: collapse"
                  >
                    <tr>
                      <td
                        style="
                          color: #ffffff;
                          font-family: Arial, sans-serif;
                          font-size: 14px;
                        "
                      >
                        <p style="margin: 0">
                          &reg; SHOPPY, All rights reserved &copy; ${new Date().getFullYear()}<br />
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
  `;
};
