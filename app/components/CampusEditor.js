import React, { Component } from 'react';
import { connect } from 'react-redux'
import store, { writeStudentEntry, 
    fetchOneCampus,
    writeCampusEntry,
    nameEntry, 
    descriptionEntry, 
    imageUrlEntry, 
    updateCampus,
    editCampus} from '../store'

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        handleNameChange: function (event) {
            return dispatch(nameEntry(event.target.value))
        },
        handleimageUrlChange: function(event) {
            return dispatch(imageUrlEntry(event.target.value))
        },
        handleDescriptionChange: function(event) {
            return dispatch(descriptionEntry(event.target.value))
        },
        handleSubmit: function (event) {
          event.preventDefault();
          console.log(ownProps)
          const uneditedCampus = Object.assign({}, ownProps.props.campuses.filter((campus=>campus.id==ownProps.props.match.params.campusid))[0])
          const formInput = Object.assign({}, store.getState().campuseditor);
          const editedCampus = {};
          console.log(uneditedCampus, formInput, editedCampus)
          for(var key in formInput){
              if(formInput.hasOwnProperty(key)){
                  switch (key){
                    case 'name':
                        console.log(formInput.name)
                        if(formInput.name.length){
                            editedCampus.name = formInput.name
                        }
                        else{
                            editedCampus.name = uneditedCampus.name
                        }
                    case 'imageUrl':
                        if(formInput.imageUrl.length){
                            editedCampus.imageUrl = formInput.imageUrl
                        }
                        else{
                            editedCampus.imageUrl = uneditedCampus.imageUrl
                        }
                    case 'description':
                        if(formInput.description!=null){
                            editedCampus.description = formInput.description
                        }
                        else{
                            editedCampus.description = uneditedCampus.description
                        }
                  }
              }
          }
          console.log(uneditedCampus, formInput, editedCampus)
          dispatch(editCampus(editedCampus, ownProps.props.match.params.campusid)) 
          dispatch(writeCampusEntry({
            name:'',
            imageUrl:'',
            description:null
            }))
          dispatch(fetchOneCampus(ownProps.props.match.params.campusid))
        }
      }
}

const mapStateToProps = function (state, ownProps) {
    return {
      campuseditor: state.campuseditor,
      campuses: state.campuses,
      students: state.students
    }
  }

export class CampusEditor extends Component {
    
    render(){
    return (
        <div>
        <form onSubmit={this.props.handleSubmit}>
            <div>
                <label>Edit this Campus</label>
                <br />
                <label>Name:
                    <input
                        name='name'
                        type='text'
                        onChange={this.props.handleNameChange}
                        value={this.props.name}
                    />
                </label>
                <br />
                <label>ImageUrl:
                    <input
                        name='imageUrl'
                        type='text'
                        onChange={this.props.handleimageUrlChange}
                        value={this.props.imageUrl}
                    />
                </label>
                <br />
                <label>Description:
                <input
                    name='description'
                    type='text'
                    onChange={this.props.handleDescriptionChange}
                    value={this.props.description}
                    />
                </label>
                <br />
            </div>
            <div>
            <button type="submit">Edit Campus</button>
            </div>
          </form>
        </div>    
    )}
}

const CampusEditorContainer = connect(mapStateToProps, mapDispatchToProps)(CampusEditor)
export default CampusEditorContainer