import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const success = state?.success;
  const experience = state?.experience;
  const selectedDate = state?.selectedDate;
  const name = state?.name;
  const email = state?.email;
  const total = state?.total;

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-6 text-center">
      {success ? (
        <>
          <div className="text-green-600 text-5xl mb-3">✅</div>
          <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-4">
            Thank you, <span className="font-semibold">{name}</span>!<br />
            Your booking for{" "}
            <span className="font-semibold">{experience?.title}</span> on{" "}
            <span className="font-semibold">{selectedDate}</span> is confirmed.
          </p>

          <div className="bg-gray-100 rounded-lg py-3 px-4 mb-4 text-left">
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Location:</strong> {experience?.location}
            </p>
            <p>
              <strong>Total Paid:</strong> ₹{total}
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </>
      ) : (
        <>
          <div className="text-red-600 text-5xl mb-3">❌</div>
          <h1 className="text-2xl font-bold mb-2">Booking Failed</h1>
          <p className="text-gray-600 mb-4">
            Something went wrong while processing your booking.
          </p>
          <button
            onClick={() =>
              navigate("/checkout", {
                state: { experience, selectedDate },
              })
            }
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
          >
            Try Again
          </button>
        </>
      )}
    </div>
  );
}

/*
✅ Reads booking data via useLocation()
✅ Renders a confirmation or failure message
✅ Displays all booking details cleanly
✅ Offers navigation:

Back to Home on success

Try Again on failure
*/
