import React, { Component } from "react";
import { generateQuotes, getFilter, getInitialData } from "../utils";
import ButtonAddNewNote from "./ButtonAddNewNote";
import DetailNote from "./DetailNote";
import FilterWrapper from "./FilterWrapper";
import Header from "./Header";
import NewNote from "./NewNote";
import EditNote from "./EditNote";
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
            keyword: "",
            quotes: {},
            isAddNote: false,
            isEditNote: false,
            isOpenNote: false,
            idMenuActive: null,
            isLoading: true,
        };

        this.onSearchHandleEvent = this.onSearchHandleEvent.bind(this);
        this.searchNotesByKeyword = this.searchNotesByKeyword.bind(this);
        this.onAddNewNote = this.onAddNewNote.bind(this);
        this.onEditNote = this.onEditNote.bind(this);
        this.handleOpenAddNote = this.handleOpenAddNote.bind(this);
        this.handleOpenEditNote = this.handleOpenEditNote.bind(this);
        this.handleOpenMenuNote = this.handleOpenMenuNote.bind(this);
        this.onDeleteNoteEventHandle = this.onDeleteNoteEventHandle.bind(this);
        this.onArchiveNoteEventHandler =
            this.onArchiveNoteEventHandler.bind(this);
        this.onSetFilterNotes = this.onSetFilterNotes.bind(this);
        this.handleOpenDetailNote = this.handleOpenDetailNote.bind(this);
        this.generateRandomQuotes = this.generateRandomQuotes.bind(this);
        this.setTimeLoading = this.setTimeLoading.bind(this);
    }

    onSearchHandleEvent(event) {
        const keyword = event.target.value;
        this.setTimeLoading(1000);

        if (keyword.length === 0)
            return this.onSetFilterNotes(this.state.filterNote);

        const searchNotes = this.state.displayNotes.filter((note) =>
            this.searchNotesByKeyword(note.title, keyword)
        );

        this.setState((prevState) => ({
            ...prevState,
            keyword,
            displayNotes: searchNotes,
            textEmpty:
                keyword.length > 0
                    ? "Catatan Yang Dicari Tidak Ditemukan"
                    : "Kamu Belum Memiliki Catatan",
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
            keyword: "",
        }));
    }

    handleOpenAddNote() {
        this.setState((prevState) => ({
            ...prevState,
            isAddNote: !prevState.isAddNote,
        }));
    }

    onEditNote(event, note) {
        event.preventDefault();
        const notes = this.state.notes.filter(
            (prevNote) => prevNote.id !== note.id
        );
        this.setTimeLoading(1000);

        this.setState((prevState) => ({
            ...prevState,
            notes: [
                ...notes,
                {
                    id: note.id,
                    title: note.title,
                    body: note.description,
                    createdAt: note.createdAt,
                    archived: note.archived,
                },
            ],
            keyword: "",
        }));
    }

    handleOpenEditNote() {
        this.setState((prevState) => ({
            ...prevState,
            isEditNote: !prevState.isEditNote,
            isOpenNote: false,
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
            archived: note.id === id ? !note.archived : note.archived,
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
            keyword: "",
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

    generateRandomQuotes() {
        const allQuotes = generateQuotes();
        const quotes = allQuotes[Math.floor(Math.random() * allQuotes.length)];
        this.setState((prevState) => ({
            ...prevState,
            quotes,
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
        this.generateRandomQuotes();
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
                {this.state.isEditNote && (
                    <EditNote
                        {...this.state.detailNote}
                        onSubmitEditNote={this.onEditNote}
                        handleOpenEditNote={this.handleOpenEditNote}
                    />
                )}
                {this.state.isOpenNote && (
                    <DetailNote
                        handleOpenDetailNote={this.handleOpenDetailNote}
                        onEditNote={this.handleOpenEditNote}
                        {...this.state.detailNote}
                    />
                )}
                <div className="container-wrapper">
                    <Header
                        keyword={this.state.keyword}
                        onSearchHandleEvent={this.onSearchHandleEvent}
                        {...this.state.quotes}
                    />
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
