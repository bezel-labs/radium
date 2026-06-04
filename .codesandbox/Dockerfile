# CodeSandbox SDK template environment for Radium.
# Single-stage: this image IS the live dev environment (npm install + dev
# server run as CodeSandbox tasks, not baked into the image).
# Debian/glibc base — CodeSandbox's agent is glibc-linked and fails on
# Alpine/musl with "exit status 127".
FROM node:22-slim

# zsh is CodeSandbox's default shell (required). bash/git/curl for tooling.
RUN apt-get update \
    && apt-get install -y --no-install-recommends zsh bash git curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*
