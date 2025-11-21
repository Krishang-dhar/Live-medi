#!/usr/bin/env python3
"""
Vercel serverless function entry point for disease prediction API
"""
from main import handler

# Export handler for Vercel
__all__ = ['handler']

