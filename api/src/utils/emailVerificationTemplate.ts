const emailVerificationTemplate = (token: string): string => `<div>
      <table
        role="presentation"
        style="
          width: 100%;
          height: 100vh;
          border-collapse: collapse;
          border: 0px;
          background-color: rgb(239, 239, 239);
        "
      >
        <tbody>
          <tr>
            <td
              align="center"
              style="padding: 1rem 2rem; vertical-align: top; width: 100% heigh:100vh;"
            >
              <table
                role="presentation"
                style="
                  max-width: 600px;
                  border-collapse: collapse;
                  border: 0px;
                  border-spacing: 0px;
                  text-align: left;
                "
              >
                <tbody>
                  <tr>
                    <td style="padding: 40px 0px 0px">
                      <div
                        style="
                          padding: 20px;
                          background-color: rgb(255, 255, 255);
                        "
                      >
                        <div style="color: rgb(0, 0, 0); text-align: left">
                          <h1 style="margin: 1rem 0">Verification code</h1>
                          <p style="padding-bottom: 16px">
                            Please use the verification code below to sign in.
                          </p>
                          <p style="padding-bottom: 16px">
                            <strong style="font-size: 130%">${token}</strong>
                          </p>
                          <p style="padding-bottom: 16px">
                            If you didn’t request this, you can ignore this
                            email.
                          </p>
                          <p style="padding-bottom: 16px">
                            Thanks,<br />The <b>CodeBlog</b>
                          </p>
                        </div>
                      </div>
                      <div
                        style="
                          padding-top: 20px;
                          color: rgb(153, 153, 153);
                          text-align: center;
                        "
                      >
                        <p style="padding-bottom: 16px">Made with ♥ in India</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>`

export default emailVerificationTemplate
