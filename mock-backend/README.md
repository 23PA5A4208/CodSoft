# mock-backend

A minimal Express mock backend that supports:
- POST /send-otp   { phone }
- POST /verify-otp { phone, otp }

## Run
- cd mock-backend
- npm install
- npm start

The backend prints OTP codes to server logs for testing purposes.

