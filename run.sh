#!/bin/bash
# This uses more commands, but reads easier to me.
# IP=$(ip -f inet addr show eth0 | grep "inet .*/" | cut -d'/' -f1 | cut -d' ' -f6)

# This uses fewer commands, but is less comprehensible to me.
IP=$(ip -f inet addr show eth0 | sed -n -e 's/^    inet \(.*\)\/.*$/\1/p')

bundle exec jekyll serve --host=$IP
