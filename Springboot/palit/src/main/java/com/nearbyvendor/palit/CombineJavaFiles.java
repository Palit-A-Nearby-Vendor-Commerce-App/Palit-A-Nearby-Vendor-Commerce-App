package com.nearbyvendor.palit;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class CombineJavaFiles {
    public static void main(String[] args) {
        try {
            List<File> javaFiles = new ArrayList<>();
            findJavaFiles(new File("."), javaFiles);

            // Specify files and folders to exempt
            List<String> exemptFilesAndFolders = new ArrayList<>();
            exemptFilesAndFolders.add("CombineJavaFiles.java");
            exemptFilesAndFolders.add("PalitApplication.java");
            exemptFilesAndFolders.add("config");

            if (!javaFiles.isEmpty()) {
                BufferedWriter combinedWriter = new BufferedWriter(new FileWriter("combined.txt")); // Change the filename to 'combined.txt'

                for (File javaFile : javaFiles) {
                    String fileName = javaFile.getName();
                    if (!exemptFilesAndFolders.contains(fileName)) {
                        combinedWriter.write(fileName);
                        combinedWriter.newLine();
                        combinedWriter.write("```"); // Start triple backticks
                        combinedWriter.newLine();
                        BufferedReader reader = new BufferedReader(new FileReader(javaFile));
                        String line;
                        while ((line = reader.readLine()) != null) {
                            combinedWriter.write(line);
                            combinedWriter.newLine();
                        }
                        reader.close();
                        combinedWriter.write("```"); // End triple backticks
                        combinedWriter.newLine();
                    }
                }

                combinedWriter.close();
                System.out.println("Java files have been combined into 'combined.txt' with exemptions.");
            } else {
                System.out.println("No Java files found in the current directory or its subdirectories.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void findJavaFiles(File directory, List<File> javaFiles) {
        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory() && !file.getName().equals("config")) {
                    findJavaFiles(file, javaFiles); // Recursively search in subdirectories.
                } else if (file.getName().endsWith(".java")) {
                    javaFiles.add(file);
                }
            }
        }
    }
}
