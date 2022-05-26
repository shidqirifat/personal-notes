import React, { Component } from "react";
import { getFilter, getInitialData } from "../utils";
import ButtonAddNewNote from "./ButtonAddNewNote";
import DetailNote from "./DetailNote";
import FilterWrapper from "./FilterWrapper";
import Header from "./Header";
import NewNote from "./NewNote";
import WrapCardNote from "./WrapCardNote";

export default class NoteApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: getInitialData(),
            displayNotes: getInitialData(),
            detailNote: {},
            filterNote: "all",
            textEmpty: "Kamu Belum Memiliki Catatan",
            isAddNote: false,
            isOpenNote: false,
            idMenuActive: null,
            isLoading: true,
        };

        this.onSearchHandleEvent = this.onSearchHandleEvent.bind(this);
        this.searchNotesByKeyword = this.searchNotesByKeyword.bind(this);
        this.onAddNewNote = this.onAddNewNote.bind(this);
        this.handleOpenAddNote = this.handleOpenAddNote.bind(this);
        this.handleOpenMenuNote = this.handleOpenMenuNote.bind(this);
        this.onDeleteNoteEventHandle = this.onDeleteNoteEventHandle.bind(this);
        this.onArchiveNoteEventHandler =
            this.onArchiveNoteEventHandler.bind(this);
        this.onSetFilterNotes = this.onSetFilterNotes.bind(this);
        this.handleOpenDetailNote = this.handleOpenDetailNote.bind(this);
        this.setTimeLoading = this.setTimeLoading.bind(this);
    }

    onSearchHandleEvent(keyword) {
        this.setTimeLoading(1000);
        if (keyword.length === 0)
            return this.onSetFilterNotes(this.state.filterNote);

        const searchNotes = this.state.displayNotes.filter((note) =>
            this.searchNotesByKeyword(note.title, keyword)
        );
        this.setState((prevState) => ({
            ...prevState,
            displayNotes: searchNotes,
        }));
    }

    searchNotesByKeyword(title, keyword) {
        for (let i = 0; i < keyword.length; i++) {
            if (keyword[i].toLowerCase() !== title[i].toLowerCase())
                return false;
        }
        return true;
    }

    onAddNewNote(event, note) {
        event.preventDefault();
        this.setTimeLoading(1000);

        this.setState((prevState) => ({
            ...prevState,
            notes: [
                ...prevState.notes,
                {
                    id: prevState.notes.length + 1,
                    title: note.title,
                    body: note.description,
                    createdAt: new Date(),
                    archived: false,
                },
            ],
        }));
    }

    handleOpenAddNote() {
        this.setState((prevState) => ({
            ...prevState,
            isAddNote: !prevState.isAddNote,
        }));
    }

    handleOpenMenuNote(event, id) {
        event.stopPropagation();

        this.setState((prevState) => ({
            ...prevState,
            idMenuActive: prevState.idMenuActive === id ? null : id,
        }));
    }

    onDeleteNoteEventHandle(event, id) {
        event.stopPropagation();
        this.setTimeLoading(1000);

        const noteAfterDelete = this.state.notes.filter(
            (note) => note.id !== id
        );
        this.setState((prevState) => ({
            ...prevState,
            notes: noteAfterDelete,
        }));
    }

    onArchiveNoteEventHandler(event, id) {
        event.stopPropagation();
        const noteAfterArchive = this.state.notes.map((note) => ({
            ...note,
            archived: note.id === id ? true : note.archived,
        }));
        this.setState((prevState) => ({
            ...prevState,
            notes: noteAfterArchive,
            idMenuActive: null,
        }));
    }

    onSetFilterNotes(filter) {
        this.setTimeLoading(1000);

        let filterNotes = [];
        let textEmpty = "";

        switch (filter) {
            case "active":
                filterNotes = this.state.notes.filter((note) => !note.archived);
                textEmpty = "Tidak Ada Catatan Aktif Saat Ini";
                break;
            case "archived":
                filterNotes = this.state.notes.filter((note) => note.archived);
                textEmpty = "Tidak Ada Catatan Diarsipkan Saat Ini";
                break;
            default:
                filterNotes = this.state.notes.sort(
                    (prevNote, currNote) =>
                        Number(currNote.archived) - Number(prevNote.archived)
                );
                textEmpty = "Kamu Belum Memiliki Catatan Saat Ini";
        }

        this.setState((prevState) => ({
            ...prevState,
            displayNotes: filterNotes,
            filterNote: filter,
            textEmpty,
        }));
    }

    handleOpenDetailNote(id) {
        if (id === null) {
            return this.setState((prevState) => ({
                ...prevState,
                detailNote: {},
                isOpenNote: false,
            }));
        }

        const detailNote = this.state.notes.filter((note) => note.id === id)[0];
        this.setState((prevState) => ({
            ...prevState,
            detailNote,
            isOpenNote: true,
        }));
    }

    setTimeLoading(miliseconds) {
        this.setState((prevState) => ({
            ...prevState,
            isLoading: true,
        }));
        setTimeout(() => {
            this.setState((prevState) => ({
                ...prevState,
                isLoading: false,
            }));
        }, miliseconds);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.notes !== this.state.notes) {
            this.onSetFilterNotes(this.state.filterNote);
        }
    }

    componentDidMount() {
        this.onSetFilterNotes(this.state.filterNote);
    }

    render() {
        return (
            <>
                {this.state.isAddNote && (
                    <NewNote
                        onSubmitNewNote={this.onAddNewNote}
                        handleOpenAddNote={this.handleOpenAddNote}
                    />
                )}
                {this.state.isOpenNote && (
                    <DetailNote
                        handleOpenDetailNote={this.handleOpenDetailNote}
                        {...this.state.detailNote}
                    />
                )}
                <div className="container-wrapper">
                    <Header onSearchHandleEvent={this.onSearchHandleEvent} />
                    <div className="body-wrapper">
                        <FilterWrapper
                            filters={getFilter()}
                            currentFilter={this.state.filterNote}
                            setFilter={this.onSetFilterNotes}
                        />
                        <WrapCardNote
                            textEmpty={this.state.textEmpty}
                            loading={this.state.isLoading}
                            notes={this.state.displayNotes}
                            onOpenDetail={this.handleOpenDetailNote}
                            onDelete={this.onDeleteNoteEventHandle}
                            onArchive={this.onArchiveNoteEventHandler}
                            onOpenMenu={this.handleOpenMenuNote}
                            idMenuActive={this.state.idMenuActive}
                        />
                    </div>
                    <ButtonAddNewNote onClick={this.handleOpenAddNote} />
                </div>
            </>
        );
    }
}
