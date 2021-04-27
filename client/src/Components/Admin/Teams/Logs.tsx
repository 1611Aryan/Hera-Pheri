import { useState } from "react";
import { team } from "./../interface";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const Logs: React.FC<{ team: team }> = ({ team }) => {
  const [log, setLog] = useState(false);

  const toggleLogs = () => {
    setLog(!log);
  };

  return (
    <div>
      <ul className="logs">
        <h3>
          <span>
            Logs:
            <FontAwesomeIcon
              icon={log ? faCaretUp : faCaretDown}
              onClick={toggleLogs}
            />
          </span>
          <div className="line"></div>
        </h3>
        {log && team.logs.map((data, ind) => <li key={ind}>{data}</li>)}
      </ul>
    </div>
  );
};

export default Logs;
