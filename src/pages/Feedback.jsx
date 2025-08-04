import React from 'react';
import '../styling/Feedback.css'; 

function Feedback() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log('Submitted feedback:', data);
  };

  const handleReset = () => {
    // default reset behavior applies
  };

  return (
    <div>
      <form name="f1" action="" onSubmit={handleSubmit} onReset={handleReset}>
        <div className="form_container">
          <input type="text" name="t1" placeholder="Name" required />
          <input
            type="text"
            name="t2"
            id="phoneNumber"
            placeholder="Phone Number"
          />
          <input type="email" name="e1" placeholder="Email" required />
          <input
            type="text"
            name="t3"
            placeholder="Feedback"
          />
          <br />
          <br />
          <br />
          <input type="submit" value="Send >>" />
          <input type="reset" value="Clear all" />
        </div>
      </form>
    </div>
  );
}

export default Feedback;
