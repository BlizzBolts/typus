# Typus

> `Typus === Latin('type')`

## Introduction

Typus is a complete TypeScript type parser.

Typus accepts the input from source code(.ts), declarations(.d.ts) and TsDoc, and outputing a well formatted objects aka Document.

## Goal

Typus should be a fundamental tooling under TypeScript anaylize based tools.

## RoadMap

- list most use cases as possible
- fully tests for all the use cases listed
- ...

## Inspirations

I'm working on a document product which need API parsing for React Component and other TypeScript declarations.

[react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript) can not handle normal TypeScript functions well.

So I made my own.

## Type Coverages

- interface method
- interface property: function and variables

## Notes

Compiling Ts using https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#using-the-type-checker

TypeScript AST Explorer: https://ts-ast-viewer.com/#

TypeScript Compiler Notes: https://github.com/microsoft/TypeScript-Compiler-Notes

TypeScript Deep Dive: https://basarat.gitbook.io/typescript/

Node and Symbol: https://stackoverflow.com/questions/59476836/difference-between-symbol-and-node-in-typescript-compiler-api

Terms Explaination: https://github.com/microsoft/TypeScript-Compiler-Notes/blob/main/GLOSSARY.md
Ts Notes: https://github.com/microsoft/TypeScript-Compiler-Notes

Tiny compiler https://github.com/microsoft/TypeScript-Compiler-Notes
