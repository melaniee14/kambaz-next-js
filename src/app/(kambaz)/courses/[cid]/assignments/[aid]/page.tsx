export default function AssignmentEditor() {
    return (
        <>
      <div id="wd-assignments-editor">
        <h3><label htmlFor="wd-name">Assignment Name</label></h3>
        <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of 
          your Web application running on Netlify. The landing page should include the following:
          Your full name and section Links to each of the lab assignments Link to the Kanbas application
          Links to all relevant source code repositories. The Kanbas application should
          include a link to navigate back to the landing page.
        </textarea>
        <br />
        <table>
            <br></br>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
          <br></br>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <select name="ASSIGNMENTS" id="group"> 
            <option>ASSIGNMENTS</option>
            </select>
          </tr>
        <br />

          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-group">Display Grade as </label>
            </td>
            <select name="percent" id="group"> 
            <option>Percentage</option>
            </select>
          </tr>
          <br />

          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-group">Submission Type </label>
            </td>
            <select name="online" id="type"> 
            <option>Online</option>
            </select>
            
            <br />
            <tr>
                <td align="left" valign="top">
                    
            <label>Online Entry Options</label><br/>

            <input type="checkbox" name="options" id="wd-chkbox-entry"/>
            <label htmlFor="wd-chkbox-entry">Text Entry</label><br/>

            <input type="checkbox" name="options" id="wd-chkbox-url"/>
            <label htmlFor="wd-chkbox-url">Website URL</label><br/>

            <input type="checkbox" name="options" id="wd-chkbox-url"/>
            <label htmlFor="wd-chkbox-url">Media Recordings</label><br/>

            <input type="checkbox" name="options" id="wd-chkbox-url"/>
            <label htmlFor="wd-chkbox-url">Student Annotation</label>
            <br />

            <input type="checkbox" name="options" id="wd-chkbox-upload"/>
            <label htmlFor="wd-chkbox-upload">File Uploads</label>
            </td>
            </tr>

            <br />
        
          </tr>
          <br></br>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Assign</label>
              </td>
              <td>
              <label>Assign to</label> <br />
              <input id="wd-name" defaultValue="Everyone" /><br /><br />

              <label>Due</label> <br />
              <input type="date"
                    defaultValue="2024-05-13"
                    id="wd-text-fields-due"/><br /> <br />
                   
           
            <label>Available From&emsp;&nbsp;&nbsp;Until</label> <br />
                   <input type="date"
                    defaultValue="2024-05-06"
                    id="wd-text-fields-due"/> <input type="date"
                    defaultValue="2024-05-20"
                    id="wd-text-fields-due"/>
           </td>
          </tr>
          <br />
         
        </table>
         
      </div>

      <div>
        <hr />
        <div style={{textAlign: 'right', padding:'10px 170px'}}>
        <button>Cancel</button> <button>Save</button>
        </div>
           
            

      </div>
      </>
      

  );}
  