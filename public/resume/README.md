# Resume / CV

Place your PDF here with the exact filename:

```
public/resume/Takwa_Laffet_CV.pdf
```

The Resume application loads this path at runtime:

- It checks the file with a `HEAD` request.
- If the file is present, it is displayed inline in the PDF viewer with
  **Download CV** and **Open CV** buttons.
- If the file is missing, the window shows a friendly placeholder instead of a
  broken frame — no configuration change is needed.

The filename is defined in one place only: `resumeFile` in
`src/data/profile.ts`. Change it there if you prefer a different name.