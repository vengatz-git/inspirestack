# Onboarding

## Purpose

Collect a unique username after first OAuth login.

## Flow

OAuth
↓
Onboarding
↓
Username validation
↓
Database update
↓
Dashboard

## Folder Structure

actions/
components/
hooks/
schemas/
services/

## Server Action

completeOnboarding()

## Service

completeOnboardingService()

## Validation

Zod

## Form

React Hook Form + shadcn Field API