#!/usr/bin/env bash

ln -f hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit