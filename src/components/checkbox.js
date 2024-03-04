function Checkbox({ name, fnc, value }) {
    return (
        <>
            <div className="row mb-2">
                <label for="inputPasswordDetails" class="col-sm-10 col-form-label"></label>
                <div className="col-8">{name}</div>
                <div className="col-3 form-check form-switch d-flex justify-content-end">
                    <input
                        type="checkbox"
                        role="switch"
                        className="form-check-input"
                        id="flexSwitchCheckChecked"
                        onChange={fnc}
                        defaultChecked={value}
                    />
                </div>
            </div>
        </>
    );
}
export default Checkbox;
