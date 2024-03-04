import Checkbox from "./components/checkbox";
import { useState } from "react";

function App() {
  // array of symbols
  const specialCharkeys = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "+",
    "=",
    "[",
    "]",
    "{",
    "}",
    "|",
    "\\",
    ";",
    ":",
    "'",
    '"',
    ",",
    ".",
    "<",
    ">",
    "?",
    "/",
    "~",
    "`",
  ];
  // array of alphabets
  const charKeys = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  // initialize state values
  let [password_Screen, setPassword_screen] = useState("");
  const [checkInputs, setCheckInputs] = useState(Array(4).fill(true));
  let [pass_length, setPass_length] = useState(10);
  let [copy_btn, setCopy_btn] = useState("block");
  let [copy_done, setCopy_done] = useState("none");
  let [pop_up, setPop_up] = useState("none");
  let [title, setTitle] = useState("copy");

  // deciding length of password
  function handleLength(e) {
    setPass_length(e.target.value);
  }
  // decide to include symbols @#$.. - ture / false
  function handleChecks(val) {
    const copyCheckInputs = checkInputs.slice();
    copyCheckInputs[val] = !copyCheckInputs;
    if (checkInputs[val]) {
      copyCheckInputs[val] = false;
    } else {
      copyCheckInputs[val] = true;
    }
    setCheckInputs(copyCheckInputs);
  }

  function handleGenerateButton(event) {
    event.preventDefault();
    let password = "";
    if (
      checkInputs[3] === true ||
      checkInputs[2] === true ||
      checkInputs[1] === true ||
      checkInputs[0] === true
    ) {
      let count = 0;
      // forming password according to given length
      while (count < pass_length) {
        // choosing a digit to decide amongst symbol,num 123..,big ABC.., small abc ..
        let random_number = Math.floor(Math.random() * 4);

        // choosing big alphabets randomly
        if (random_number === 2 && checkInputs[0] === true) {
          let characterUpper = charKeys[Math.floor(Math.random() * 26)];
          password += characterUpper;
          count++;
        }
        // choosing small alphabets randomly
        if (random_number === 3 && checkInputs[1] === true) {
          let characterLower =
            charKeys[Math.floor(Math.random() * 26)].toLowerCase();
          password += characterLower;
          count++;
        }
        // choosing number randomly
        if (random_number === 1 && checkInputs[2] === true) {
          let number = Math.floor(Math.random() * 10);
          password += number;
          count++;
        }
        // choosing symbol randomly
        if (random_number === 0 && checkInputs[3] === true) {
          let symbol = specialCharkeys[Math.floor(Math.random() * 32)];
          password += symbol;
          count++;
        }
      }
    }
    // showing password on screen
    setPassword_screen(password);
  }

  // handling copy button
  function handleCopy() {
    navigator.clipboard
      .writeText(password_Screen)
      .then(() => {
        if (password_Screen === "") {
          setPop_up("block");
        } else {
          setCopy_btn("none");
          setCopy_done("block");
          setTitle("copied");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  // handling pop-up close button
  function handleClose() {
    setPop_up("none");
  }

  return (
    <>
      {/* popup starts here */}
      <div className={`modal bg-secondary h-50 p-2 d-${pop_up}`}>
        <div className="container col-lg-5 col-md-6 col-sm-8">
          <div className="modal-content modal-body">
            <div className="modal-title">Please generate password first</div>
            <div className="my-3 d-flex justify-content-end">
              <button className="btn btn-dark" onClick={handleClose}>
                ok
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* popup ends here  */}

      {/* password generator card starts here  */}
      <div className="row d-flex justify-content-center mt-2">
        <div className="card col-lg-6 col-md-8 border-0 shadow-sm">
          <div className="card-body ms-4">
            {/* password generator heading starts here */}
            <h3 className="card-title text-center mb-4">Password Generator</h3>
            {/* password generator heading ends here  */}

            {/* password display screen starts here */}
            <div
              className="col-11 card p-4 mb-4 me-4"
              style={{ height: "5rem" }}
            >
              <span className="col fs-5">{password_Screen}</span>
              {/* copy button starts here */}
              <span className="col position-absolute top-0 end-0">
                <button
                  type="button"
                  className="btn"
                  title={title}
                  onClick={handleCopy}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className={`bi bi-copy d-${copy_btn}`}
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className={`bi bi-check2 d-${copy_done}`}
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                  </svg>
                </button>
              </span>
              {/* copy button ends here  */}
            </div>
            {/* password display screen ends here */}

            {/* password details form starts here  */}
            <form onSubmit={handleGenerateButton}>
              {/* password length starts here */}
              <div className="row">
                <div className="col-8">
                  <label for="customRange2" class="col-form-label col-sm-10">
                    Password Length
                  </label>
                </div>
                <div className="col-3 d-flex justify-content-end">
                  {pass_length}
                </div>
              </div>
              {/* password length ends here  */}

              {/* range-input starts here */}
              <div class="row">
                <div className="col-11 me-1">
                  <input
                    type="range"
                    className="form-range rounded"
                    min="6"
                    max="33"
                    onChange={handleLength}
                    defaultValue={pass_length}
                    id="customRange2"
                  />
                </div>
              </div>
              {/* range-input ends here */}

              {/* input uppercase starts here */}
              <Checkbox
                name="Include uppercase letters"
                fnc={() => {
                  handleChecks(0);
                }}
                value={checkInputs[0]}
              />
              {/* input uppercase ends here */}

              {/* input lowercase starts here */}
              <Checkbox
                name="Include lowercase letters"
                fnc={() => {
                  handleChecks(1);
                }}
                value={checkInputs[1]}
              />
              {/* input lowercase ends here */}

              {/* input numbers starts here */}
              <Checkbox
                name="Include numbers"
                fnc={() => {
                  handleChecks(2);
                }}
                value={checkInputs[2]}
              />
              {/* input numbers ends here */}

              {/* input symbols starts here */}
              <Checkbox
                name="Include Symbols"
                fnc={() => {
                  handleChecks(3);
                }}
                value={checkInputs[3]}
              />
              {/* input symbols ends here   */}

              {/* submit button starts here */}
              <div className="row row-cols-auto d-flex justify-content-center mt-4 mb-1">
                <button type="submit" className="btn btn-dark">
                  Generate
                </button>
              </div>
              {/* submit button ends here */}
            </form>
            {/* password details form ends here  */}
          </div>
        </div>
      </div>
      {/* password generator card ends here  */}
    </>
  );
}
export default App;
